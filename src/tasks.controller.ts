import { Body, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { UserAgent } from './common/user-agent.decorator.js';
import { TasksService } from './tasks.service.js';
import { Patch } from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators/http/index.js';
import { CreateTaskDto } from './tasks/dto/create-task.dto.js';
import { UpdateTaskDto } from './tasks/dto/update-task.dto.js';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks() {
    return this.tasksService.findAll();
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto.title);
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
  async getTaskById(@Param('id', ParseIntPipe) id: number) {
    const task = await this.tasksService.findOne(id);
    return task;
  }

  @Patch(':id')
  updateTask(@Param('id', ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto.done);
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.delete(id);
  }
}
