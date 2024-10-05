import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  numberAttribute,
  viewChild,
} from '@angular/core';
import { NgxCountAnimationDirective } from 'ngx-count-animation';
import {
  delay,
  fromEvent,
  map,
  startWith,
  switchMap,
  throttleTime,
  timer,
} from 'rxjs';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-progress-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgxCountAnimationDirective],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
})
export class ProgressBarComponent
  extends ExtendedComponent
  implements AfterViewInit
{
  /**
   * Reference to the progress bar element.
   */
  private barRef = viewChild.required<ElementRef<HTMLElement>>('barRef');

  /**
   * The progress value for the progress bar.
   * @required
   */
  public progress = input.required({ transform: numberAttribute });

  /**
   * Delay before the animation starts.
   */
  public delay = input(0, { transform: numberAttribute });

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    this.initScrollListener();
  }

  /**
   * Initializes the scroll listener for the progress bar.
   */
  private initScrollListener() {
    const barElement = this.barRef().nativeElement;

    timer(this.delay())
      .pipe(
        switchMap(() =>
          fromEvent(this.document, 'scroll').pipe(startWith(null)),
        ),
        throttleTime(50, undefined, { leading: true, trailing: true }),
        delay(1),
        map(() => {
          const rect = barElement.getBoundingClientRect();
          const windowHeight =
            window.innerHeight || this.document.documentElement.clientHeight;
          const isVisible = rect.top < windowHeight;
          return isVisible ? this.progress() : 0;
        }),
        this.destroyPipe(),
      )
      .subscribe((width) => {
        barElement.style.width = `${width}%`;
      });
  }
}
