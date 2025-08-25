import { Component, OnDestroy } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { NavigationEnd } from '@angular/router';
import { StatusCardComponent } from './components/status-card/status-card';
import { TaskFormComponent } from './components/task-form/task-form';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, StatusCardComponent, TaskFormComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent implements OnDestroy {
  isTasksRoute = false;
  private sub?: Subscription;

  constructor(private router: Router, private tasksSvc: TaskService) {
    // Hide the dashboard section whenever we are on /tasks
    this.isTasksRoute = this.router.url.startsWith('/tasks');
    this.sub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => this.isTasksRoute = e.urlAfterRedirects.startsWith('/tasks'));
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  // Dashboard counters
  get tasksToday() {
    const today = new Date().toISOString().split('T')[0];
    return this.tasksSvc.getTasks().filter(t => t.dueDate === today).length;
  }
  get inProgress() { return this.tasksSvc.getTasks().filter(t => t.status === 'in-progress').length; }
  get completed() { return this.tasksSvc.getTasks().filter(t => t.status === 'completed').length; }

  // when form creates a task
  addTask(newTask: any) {
    const task = {
      id: Math.random().toString(),
      title: (newTask.title || '').trim(),
      dueDate: newTask.dueDate,
      description: newTask.description || '',
      priority: newTask.priority || 'medium',
      status: 'in-progress'
    };
    this.tasksSvc.addTask(task);
  }
}
