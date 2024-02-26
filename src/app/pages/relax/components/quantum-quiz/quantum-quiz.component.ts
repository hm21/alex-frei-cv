import { Component } from '@angular/core';
import { BackBtnComponent } from 'src/app/components/back-btn/back-btn.component';

@Component({
  selector: 'af-quantum-quiz',
  standalone: true,
  imports: [BackBtnComponent],
  templateUrl: './quantum-quiz.component.html',
  styleUrl: './quantum-quiz.component.scss',
})
export class QuantumQuizComponent {}
