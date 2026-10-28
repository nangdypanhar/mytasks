import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "./task.entity.js";

const fakeDatabaseDelay = () =>
  new Promise<void>(resolve => setTimeout(resolve, 500));

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async findAll() {
    await fakeDatabaseDelay();
    return this.tasksRepository.find();
  }

  async findOne(id: number) {
    await fakeDatabaseDelay();
    const task = await this.tasksRepository.findOneBy({ id });
    if (!task) {
      this.logger.warn(`Task with id ${id} not found`);
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async findTodoTasks() {
    await fakeDatabaseDelay();
    return this.tasksRepository.find({ where: { done: false } });
  }

  async create(title: string) {
    await fakeDatabaseDelay();
    const task = this.tasksRepository.create({ title, done: false });
    const savedTask = await this.tasksRepository.save(task);
    this.logger.debug(`New task title: "${savedTask.title}"`);
    this.logger.log(`Task ${savedTask.id} created`);
    return savedTask;
  }

  async update(id: number, done: boolean) {
    await fakeDatabaseDelay();
    const task = await this.tasksRepository.findOneBy({ id });
    if (!task) {
      this.logger.warn(`Task with id ${id} not found`);
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    task.done = done;
    const savedTask = await this.tasksRepository.save(task);
    this.logger.log(`Task ${id} updated (done: ${done})`);
    return savedTask;
  }

  async delete(id: number) {
    await fakeDatabaseDelay();
    const result = await this.tasksRepository.delete(id);
    if (!result.affected) {
      this.logger.warn(`Task with id ${id} not found`);
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    this.logger.log(`Task ${id} deleted`);
    return this.tasksRepository.find();
  }
}
