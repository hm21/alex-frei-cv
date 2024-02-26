import { Component } from '@angular/core';
import { BackBtnComponent } from 'src/app/components/back-btn/back-btn.component';

@Component({
  selector: 'af-color-clash',
  standalone: true,
  imports: [BackBtnComponent],
  templateUrl: './color-clash.component.html',
  styleUrl: './color-clash.component.scss',
})
export class ColorClashComponent {}
