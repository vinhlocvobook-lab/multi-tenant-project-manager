import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { MikroORM, EntityManager } from '@mikro-orm/core';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  constructor(private readonly em: EntityManager) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    // Resolve tenantId from User or from Header (for certain public endpoints if needed)
    const tenantId = user?.tenantId || request.headers['x-tenant-id'];

    if (tenantId) {
      // Activate the global 'tenant' filter defined in mikro-orm.config.ts and BaseTenantEntity
      this.em.addFilter('tenant', { tenantId });
    }

    return next.handle();
  }
}
