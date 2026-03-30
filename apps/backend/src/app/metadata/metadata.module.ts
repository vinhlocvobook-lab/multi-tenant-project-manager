import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { StatusDefinition } from './entities/status-definition.entity';
import { PriorityDefinition } from './entities/priority-definition.entity';
import { MetadataService } from './metadata.service';

@Module({
  imports: [MikroOrmModule.forFeature([StatusDefinition, PriorityDefinition])],
  providers: [MetadataService],
  exports: [MetadataService],
})
export class MetadataModule {}
