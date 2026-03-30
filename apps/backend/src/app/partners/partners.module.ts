import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Partner } from './entities/partner.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Partner])],
  providers: [],
  controllers: [],
  exports: [],
})
export class PartnersModule {}
