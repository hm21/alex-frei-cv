import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RESUME_TIMELINE_ITEMS } from 'src/app/configs/resume-timeline';
import { ResumeTimelineItem } from '../../utils/resume-interface';
import { ResumeTimelineItemComponent } from './resume-timeline-item/resume-timeline-item.component';

@Component({
  selector: 'af-resume-timeline',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ResumeTimelineItemComponent],
  templateUrl: './resume-timeline.component.html',
  styleUrl: './resume-timeline.component.scss',
})
export class ResumeTimelineComponent {
  /**
   * An array of resume timeline items.
   */
  public items: ResumeTimelineItem[] = RESUME_TIMELINE_ITEMS;
}
