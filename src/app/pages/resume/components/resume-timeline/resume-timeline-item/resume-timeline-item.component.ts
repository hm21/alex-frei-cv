import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { NgxScrollAnimationsModule } from 'ngx-scroll-animations';
import { fromEvent } from 'rxjs';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { ResumeTimelineItem } from '../../../utils/resume-interface';

@Component({
  selector: 'af-resume-timeline-item',
  standalone: true,
  imports: [NgClass, NgxScrollAnimationsModule],
  templateUrl: './resume-timeline-item.component.html',
  styleUrl: './resume-timeline-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('sonarAnimation', [
      transition('* => show', [
        animate(
          '1500ms ease',
          keyframes([
            style({
              transform: 'translate(-50%, -50%) scale(1)',
              opacity: 0.8,
              offset: 0,
            }),
            style({
              transform: 'translate(-50%, -50%) scale(2)',
              opacity: 0,
              offset: 1,
            }),
          ]),
        ),
      ]),
    ]),
  ],
})
export class ResumeTimelineItemComponent
  extends ExtendedComponent
  implements OnInit
{
  @Input({ required: true }) item!: ResumeTimelineItem;

  public animationState = 'stop';

  override ngOnInit(): void {
    this.hoverListener();
    super.ngOnInit();
  }

  private hoverListener() {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(this.nativeElement, 'mouseenter')
        .pipe(this.destroyPipe())
        .subscribe(() => {
          this.animationState = 'show';
          this.cdRef.detectChanges();
        });
    });
  }
}
