import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  numberAttribute,
  OnInit,
} from '@angular/core';
import { NgxCountAnimationDirective } from 'ngx-count-animation';
import svgIcon from 'src/assets/img/progress-spinner.svg';
import { ProgressSpinnerMode } from './utils/progress-spinner.type';

@Component({
  selector: 'af-progress-spinner',
  standalone: true,
  imports: [
    NgxCountAnimationDirective
  ],
  templateUrl: './progress-spinner.component.html',
  styleUrl: './progress-spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'af-progress-spinner',
  },
})
export class ProgressSpinnerComponent implements OnInit {
  private elRef = inject<ElementRef<HTMLElement>>(ElementRef);

  /** The size of the progress spinner */
  public diameter = input(32, { transform: numberAttribute });

  /**
   * The mode of the progress spinner.
   * Determines whether the spinner operates in 'determinate' or 'indeterminate' mode.
   * - 'indeterminate': Spinner spins continuously without stopping.
   * - 'determinate': Spinner represents a specific percentage of progress.
   */
  public mode = input<ProgressSpinnerMode>('indeterminate');

  /**
   * The current value of the progress in determinate mode.
   * A number between 0 and 100 that represents the percentage of progress.
   * If the input value is less than 0, it defaults to 0. If greater than 100, it defaults to 100.
   */
  public value = input(0, {
    transform: (v) => {
      const value = numberAttribute(v);
      return Math.max(0, Math.min(100, value || 0));
    },
  });

  /**
   * The width of the stroke (the thickness of the spinner's outline).
   * Default is 5 pixels.
   * If the input value is falsy (e.g., null, undefined, or 0), it defaults to 5.
   * The value is transformed using `numberAttribute`, and if the transformation results in `NaN` or another falsy value, the stroke width is set to 0.
   */
  protected strokeWidth = input(5, {
    transform: (v) => {
      if (!v) return 5;

      const value = numberAttribute(v);
      return value || 0;
    },
  });

  /** The radius of the spinner, adjusted for stroke width. */
  protected radius = computed(() => {
    return (this.diameter() - 5) / 2;
  });
  /** The stroke circumference of the svg circle. */
  protected strokeCircumference = computed(() => {
    return Math.PI * this.radius() * 2;
  });
  /** The dash offset of the svg circle. */
  protected strokeDashOffset = computed(() => {
    return (this.strokeCircumference() * (100 - this.value())) / 100;
  });
  /** The view box of the spinner's svg element. */
  protected viewBox = computed(() => {
    const viewBox = this.radius() * 2 + this.strokeWidth();
    return `0 0 ${viewBox} ${viewBox}`;
  });
  /** Stroke width of the circle in percent. */
  protected circleStrokeWidth = computed(() => {
    return (this.strokeWidth() / this.diameter()) * 100;
  });

  ngOnInit(): void {
    if (this.mode() === 'indeterminate') {
      this.elRef.nativeElement.innerHTML = svgIcon;
      const svg = this.elRef.nativeElement.firstChild as SVGElement;
      svg.style.width = `${this.diameter()}px`;
      svg.style.height = `${this.diameter()}px`;
    }
  }
}
