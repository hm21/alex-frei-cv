import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
  inject,
  numberAttribute,
} from '@angular/core';
import { NgxCountAnimationModule } from 'ngx-count-animation';
import { delay, fromEvent, map, startWith, throttleTime } from 'rxjs';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-progressbar',
  standalone: true,
  imports: [NgxCountAnimationModule],
  templateUrl: './progressbar.component.html',
  styleUrl: './progressbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressbarComponent
  extends ExtendedComponent
  implements AfterViewInit
{
  @ViewChild('barRef') barRef!: ElementRef<HTMLElement>;

  @Input({ required: true, transform: numberAttribute }) progress!: number;
  @Input({ required: true }) name!: string;

  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    const barElement = this.barRef.nativeElement;

    this.ngZone.runOutsideAngular(() => {
      fromEvent(this.document, 'scroll')
        .pipe(
          this.destroyPipe(),
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
        )
        .subscribe((width) => {
          this.renderer.setStyle(barElement, 'width', `${width}%`);
        });
    });
  }
}
