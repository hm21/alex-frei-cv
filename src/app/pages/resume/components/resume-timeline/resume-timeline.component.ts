import { Component } from '@angular/core';
import { resumeTimelineItems } from 'src/app/configs/resume-timeline';
import { ResumeTimelineItem } from '../../utils/resume-interface';
import { ResumeTimelineItemComponent } from './resume-timeline-item/resume-timeline-item.component';

@Component({
  selector: 'af-resume-timeline',
  standalone: true,
  imports: [ResumeTimelineItemComponent],
  templateUrl: './resume-timeline.component.html',
  styleUrl: './resume-timeline.component.scss',
})
export class ResumeTimelineComponent {
  /**
   * An array of resume timeline items.
   */
  public items: ResumeTimelineItem[] = resumeTimelineItems;
}
