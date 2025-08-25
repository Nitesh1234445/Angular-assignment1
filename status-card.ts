import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-card',
  standalone: true,
  templateUrl: './status-card.html',
  styleUrls: ['./status-card.scss']
})
export class StatusCardComponent {
  @Input() title: string = '';
  @Input() count: number = 0;
}
