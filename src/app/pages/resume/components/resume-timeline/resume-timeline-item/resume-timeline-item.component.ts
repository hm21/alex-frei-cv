import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  viewChild,
} from '@angular/core';
import { NgxScrollAnimationsDirective } from 'ngx-scroll-animations';
import { fromEvent } from 'rxjs';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-resume-timeline-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgxScrollAnimationsDirective],
  templateUrl: './resume-timeline-item.component.html',
  styleUrl: './resume-timeline-item.component.scss',
})
export class ResumeTimelineItemComponent
  extends ExtendedComponent
  implements OnInit, AfterViewInit
{
  private sonar = viewChild.required<ElementRef<HTMLElement>>('sonar');

  ngAfterViewInit(): void {
    this.hoverListener();
  }

  /**
   * Listens for hover events on the component and triggers the animation state change.
   */
  private hoverListener() {
    fromEvent(this.nativeElement, 'mouseenter')
      .pipe(this.destroyPipe())
      .subscribe(() => {
        this.sonar().nativeElement.classList.add('sonar-animation');
      });

    fromEvent(this.sonar().nativeElement, 'animationend')
      .pipe(this.destroyPipe())
      .subscribe(() => {
        this.sonar().nativeElement.classList.remove('sonar-animation');
      });
  }
}
