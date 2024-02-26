import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'af-back-btn',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './back-btn.component.html',
  styleUrl: './back-btn.component.scss',
})
export class BackBtnComponent {
  @Input({ required: true }) path!: string;
}
