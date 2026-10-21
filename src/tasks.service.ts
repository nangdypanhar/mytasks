import { Injectable } from "@nestjs/common";

@Injectable()
export class TasksService {
  private tasks = [
    {
      id: 1,
      title: "Do homework",
      done: false
    },
    {
      id: 2,
      title: "Read a book",
      done: true
    }
  ];

  private nextId = 3;

  findAll() {
    return this.tasks;
  }

  findOne(id: number) {
    return this.tasks.find(task => task.id === id);
  }

  findTodoTasks() {
    return this.tasks.filter(task => !task.done);
  }

  create(title: string) {
    const task = { id: this.nextId++, title, done: false };
    this.tasks.push(task);
    return task;
  }

  update(id: number, done: boolean) {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      task.done = done;
    }
    return task;
  }

  delete(id: number) {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      const deletedTask = this.tasks.splice(index, 1)[0];
      return this.tasks;
    }
    return null;
  }

}