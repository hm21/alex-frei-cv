import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  numberAttribute
} from '@angular/core';
import { NgxCountAnimationDirective } from 'ngx-count-animation';
import { delay, fromEvent, map, startWith, throttleTime } from 'rxjs';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-progressbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgxCountAnimationDirective],
  templateUrl: './progressbar.component.html',
  styleUrl: './progressbar.component.scss',
})
export class ProgressbarComponent
  extends ExtendedComponent
  implements AfterViewInit
{
  /**
   * Reference to the progress bar element.
   * @type {ElementRef<HTMLElement>}
   */
  @ViewChild('barRef') barRef!: ElementRef<HTMLElement>;

  /**
   * The progress value for the progress bar.
   * @type {number}
   * @required
   */
  @Input({ required: true, transform: numberAttribute }) progress!: number;

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    this.initScrollListener();
  }

  /**
   * Initializes the scroll listener for the progress bar.
   */
  private initScrollListener() {
    const barElement = this.barRef.nativeElement;

    fromEvent(this.document, 'scroll')
      .pipe(
        throttleTime(50, undefined, { leading: true, trailing: true }),
        startWith(null),
        delay(1),
        map(() => {
          const rect = barElement.getBoundingClientRect();
          const windowHeight =
          window.innerHeight || this.document.documentElement.clientHeight;
          const isVisible = rect.top < windowHeight;
          return isVisible ? this.progress : 0;
        }),
        this.destroyPipe(),
      )
      .subscribe((width) => {
        this.renderer.setStyle(barElement, 'width', `${width}%`);
      });
  }
}
