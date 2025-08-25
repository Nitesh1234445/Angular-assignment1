import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule, FormBuilder, Validators,
  FormGroup, AbstractControl, ValidationErrors
} from '@angular/forms';  // <-- RouterLink removed

function notPastDate(control: AbstractControl): ValidationErrors | null {
  const val = control.value as string;
  if (!val) return null;
  const picked = new Date(val + 'T00:00:00');
  const t = new Date();
  const todayOnly = new Date(t.getFullYear(), t.getMonth(), t.getDate());
  return picked < todayOnly ? { pastDate: true } : null;
}

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // <-- RouterLink removed
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.scss']
})
export class TaskFormComponent {
  @Output() createTask = new EventEmitter<any>();

  form: FormGroup;
  todayStr: string;

  constructor(private fb: FormBuilder) {
    const t = new Date();
    const yyyy = t.getFullYear();
    const mm = String(t.getMonth() + 1).padStart(2, '0');
    const dd = String(t.getDate()).padStart(2, '0');
    this.todayStr = `${yyyy}-${mm}-${dd}`;

    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      dueDate: ['', [Validators.required, notPastDate]],
      description: [''],
      priority: ['medium', [Validators.required]]
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.createTask.emit(this.form.value);
    this.form.reset({ title: '', dueDate: '', description: '', priority: 'medium' });
  }
}
