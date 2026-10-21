import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {


  getHello(): string {
    return 'Hello World!';
  }

  getWelcome(name: string): object {
      const tasks = [
    {
      id: 1,
      title: "Do homework",
      done: false
    },
    {
      id: 2,
      title: "Read a book",
      done: true
    },
    {
      id: 3,
      title: "Write a report",
      done: false
    }
  ];

  const message = {
    "name": `Welcome to MyTasks, ${name}!`,
    "tasks": tasks,
    "taskCount": tasks.length,
    "serverTime": new Date().toISOString()

  }


   return message;
  }
}
