import {
  Component,
  ElementRef,
  inject,
  input,
  numberAttribute,
  OnInit,
} from '@angular/core';
import svgIcon from 'src/assets/img/progress-spinner.svg';

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
export class ProgressSpinnerComponent implements OnInit {
  /** The size of the progress spinner */
  public size = input(32, { transform: numberAttribute });

  private elRef = inject<ElementRef<HTMLElement>>(ElementRef);

  ngOnInit(): void {
    this.elRef.nativeElement.innerHTML = svgIcon;
    const svg = this.elRef.nativeElement.firstChild as SVGElement;
    svg.style.width = `${this.size()}px`;
    svg.style.height = `${this.size()}px`;
  }
}
