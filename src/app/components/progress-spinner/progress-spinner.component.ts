import { Component, input, numberAttribute } from '@angular/core';

@Component({
  selector: 'af-progress-spinner',
  standalone: true,
  imports: [],
  templateUrl: './progress-spinner.component.html',
  styleUrl: './progress-spinner.component.scss',
  host: {
    class: 'af-progress-spinner',
  },
})
export class ProgressSpinnerComponent {
  /** The size of the progress spinner */
  public size = input(32, { transform: numberAttribute });
}
