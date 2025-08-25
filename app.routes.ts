import { Routes } from '@angular/router';
import { TasksPageComponent } from './pages/tasks/tasks';

export const routes: Routes = [
  { path: 'tasks', component: TasksPageComponent },
  { path: '**', redirectTo: '' } // root shows dashboard inside AppComponent
];
