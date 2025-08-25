import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks: any[] = [];

  getTasks() { return this.tasks; }
  addTask(t: any) { this.tasks.push(t); }
  removeAt(i: number) { this.tasks.splice(i, 1); }
}
