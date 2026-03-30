import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
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
  async findAll(
    @Query('projectId') projectId: string,
    @GetUser('tenantId') tenantId: string,
  ) {
    return this.tasksService.findAll({ projectId, tenantId });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }
}
