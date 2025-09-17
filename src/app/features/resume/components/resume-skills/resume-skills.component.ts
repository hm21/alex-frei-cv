import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { NgxScrollAnimationsDirective } from 'ngx-scroll-animations';
import {
  BACKEND_SKILLS,
  FRONTEND_SKILLS,
  KNOWLEDGE,
} from 'src/app/core/constants/resume/resume-skills.constants';
import { ScreenService } from 'src/app/core/services/screen/screen.service';
import { ProgressBarComponent } from 'src/app/shared/components/progress-bar/progress-bar.component';
import { Knowledge } from '../../types/resume-knowledge.type';
import { SkillItem } from '../../types/resume-skill-item.type';
import { ResumeSkillCardComponent } from '../resume-skill-card/resume-skill-card.component';

@Component({
  selector: 'af-resume-skills',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ProgressBarComponent,
    ResumeSkillCardComponent,
    NgxScrollAnimationsDirective,
  ],
  templateUrl: './resume-skills.component.html',
  styleUrl: './resume-skills.component.scss',
  host: {
    class: 'af-resume-skills',
  },
})
export class ResumeSkillsComponent implements OnInit {
  private screen = inject(ScreenService);

  /**
   * Delay time before the progress-bar animation start.
   */
  protected staggerDelay!: number;

  /**
   * An array of frontend skills.
   */
  protected readonly frontendSkills: ReadonlyArray<SkillItem> = FRONTEND_SKILLS;

  /**
   * An array of backend skills.
   */
  protected readonly backendSkills: ReadonlyArray<SkillItem> = BACKEND_SKILLS;

  /**
   * An array of knowledge areas.
   */
  protected readonly knowledge: ReadonlyArray<Knowledge> = KNOWLEDGE;

  ngOnInit(): void {
    this.calculateStaggerDelay();
  }

  private calculateStaggerDelay() {
    this.staggerDelay =
      this.screen.width > 1200 ||
      (this.screen.width >= 800 && this.screen.width < 1024)
        ? 80
        : 0;
  }
}
