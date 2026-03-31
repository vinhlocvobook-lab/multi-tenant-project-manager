import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { GetUser } from '../common/decorators/get-user.decorator';
import { RequirePermissions } from '../common/decorators/permissions.decorator';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @RequirePermissions('tasks:create')
  async create(
    @Body() dto: { 
      title: string; 
      description?: string; 
      projectId?: string; 
      statusId?: string;
      priorityId?: string;
      assigneeId?: string;
      parentTaskId?: string;
      clientId?: string;
    },
    @GetUser('tenantId') tenantId: string,
  ) {
    return this.tasksService.create(dto, tenantId);
  }

  @Get()
  @RequirePermissions('tasks:read')
  async findAll(
    @Query('projectId') projectId: string,
    @GetUser('tenantId') tenantId: string,
  ) {
    return this.tasksService.findAll({ projectId, tenantId });
  }

  @Get(':id')
  @RequirePermissions('tasks:read')
  async findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }
}
