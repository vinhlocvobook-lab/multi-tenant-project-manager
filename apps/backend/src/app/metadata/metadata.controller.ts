import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { EntityType } from '@multi-tenant-project-manager/shared-types';

@Controller('metadata')
@UseGuards(JwtAuthGuard)
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  @Get('statuses')
  async getStatuses(
    @GetUser('tenantId') tenantId: string,
    @Query('type') type?: EntityType,
  ) {
    return this.metadataService.findStatuses(tenantId, type);
  }

  @Get('priorities')
  async getPriorities(
    @GetUser('tenantId') tenantId: string,
    @Query('type') type?: EntityType,
  ) {
    return this.metadataService.findPriorities(tenantId, type);
  }
}
