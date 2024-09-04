import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxScrollAnimationsDirective } from 'ngx-scroll-animations';
import { ProgressBarComponent } from 'src/app/components/progress-bar/progress-bar.component';
import {
  BACKEND_SKILLS,
  FRONTEND_SKILLS,
  KNOWLEDGE,
} from 'src/app/configs/resume-skills';
import { SkillItem } from '../../utils/resume-interface';

@Component({
  selector: 'af-resume-skills',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProgressBarComponent, NgxScrollAnimationsDirective],
  templateUrl: './resume-skills.component.html',
  styleUrl: './resume-skills.component.scss',
})
export class ResumeSkillsComponent {
  /**
   * An array of frontend skills.
   */
  public frontendSkills: SkillItem[] = FRONTEND_SKILLS;

  /**
   * An array of backend skills.
   */
  public backendSkills: SkillItem[] = BACKEND_SKILLS;

  /**
   * An array of knowledge areas.
   */
  public knowledge = KNOWLEDGE;
}
