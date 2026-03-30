import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { LoginDto, AuthResponse } from '@multi-tenant/shared-types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async login(loginDto: LoginDto): Promise<AuthResponse & { refreshToken: string }> {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await user.validatePassword(loginDto.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.getTokens(user.id, user.email, user.tenant.id, user.role);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        tenantId: user.tenant.id,
      } as any,
      ...tokens,
    };
  }

  async logout(userId: string): Promise<void> {
    const user = await this.usersService.findOne(userId);
    user.currentRefreshToken = null;
    await this.usersService.update(user);
  }

  async refreshTokens(userId: string, refreshToken: string): Promise<AuthResponse & { refreshToken: string }> {
    const user = await this.usersService.findOne(userId);
    if (!user || !user.currentRefreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const isRefreshTokenValid = await user.validateRefreshToken(refreshToken);
    if (!isRefreshTokenValid) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(user.id, user.email, user.tenant.id, user.role);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        tenantId: user.tenant.id,
      } as any,
      ...tokens,
    };
  }

  async updateRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const user = await this.usersService.findOne(userId);
    await user.setCurrentRefreshToken(refreshToken);
    await this.usersService.update(user);
  }

  async getTokens(userId: string, email: string, tenantId: string, role: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email, tenantId, role },
        {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: '15m',
        }
      ),
      this.jwtService.signAsync(
        { sub: userId, email, tenantId, role },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        }
      ),
    ]);

    return { accessToken, refreshToken };
  }
}
