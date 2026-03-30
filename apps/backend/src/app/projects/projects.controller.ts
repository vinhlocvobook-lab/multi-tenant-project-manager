import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { GetUser } from '../common/decorators/get-user.decorator';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(
    @Body() dto: { 
      name: string; 
      description?: string; 
      statusId?: string;
      priorityId?: string;
      startDate?: Date;
      endDate?: Date;
      leaderIds?: string[];
      departmentIds?: string[];
      clientId?: string;
    },
    @GetUser('tenantId') tenantId: string,
    @GetUser('id') userId: string,
  ) {
    return this.projectsService.create(dto, tenantId);
  }

  @Get()
  async findAll(@GetUser('tenantId') tenantId: string) {
    return this.projectsService.findAll(tenantId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }
}
