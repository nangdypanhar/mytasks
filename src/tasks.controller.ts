import { Body, Param, Post } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { UserAgent } from './common/user-agent.decorator.js';
import { TasksService } from './tasks.service.js';
import { Patch } from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators/http/index.js';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks() {
    return this.tasksService.findAll();
  }

  @Post()
  createTask(@Body('title') title: string) {
    return this.tasksService.create(title);
  }

  @Get('todo')
  getTodoTasks() {
    return this.tasksService.findTodoTasks();
  }

  @Get('agent')
  whoIsAsking(@UserAgent() agent: string) {
    return { agent };
  }

  @Get(':id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.findOne(Number(id));
  }

  @Patch(':id')
  updateTask(@Param('id') id: string, @Body('done') done: boolean) {
    return this.tasksService.update(Number(id), done);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.delete(Number(id));
  }
}
