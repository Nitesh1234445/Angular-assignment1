// export type TaskStatus = 'in-progress' | 'completed';
// export type Priority = 'low' | 'medium' | 'high';

// export interface Task {
//   id: string;
//   title: string;
//   description: string;
//   dueDate: string;   // ISO date
//   priority: Priority;
//   status: TaskStatus;
//   createdAt: string; // ISO
//   updatedAt: string; // ISO
// }

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  priority: string;
  status: string;
}
