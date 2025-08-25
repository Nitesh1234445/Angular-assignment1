import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.scss']
})
export class TasksPageComponent {
  constructor(public tasksSvc: TaskService) {}

  markDone(t: any) { t.status = 'completed'; }
  remove(i: number) { this.tasksSvc.removeAt(i); }
}
