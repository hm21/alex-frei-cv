import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { NgxScrollAnimationsDirective } from 'ngx-scroll-animations';
import { ScreenService } from 'src/app/core/services/screen/screen.service';
import { ProgressBarComponent } from 'src/app/shared/components/progress-bar/progress-bar.component';
import {
  BACKEND_SKILLS,
  FRONTEND_SKILLS,
  KNOWLEDGE,
} from 'src/app/shared/constants/resume/resume-skills.constants';
import { SkillItem } from '../../interfaces/resume.interface';

@Component({
  selector: 'af-resume-skills',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProgressBarComponent, NgxScrollAnimationsDirective],
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
  protected frontendSkills: SkillItem[] = FRONTEND_SKILLS;

  /**
   * An array of backend skills.
   */
  protected backendSkills: SkillItem[] = BACKEND_SKILLS;

  /**
   * An array of knowledge areas.
   */
  protected knowledge = KNOWLEDGE;

  ngOnInit(): void {
    this.staggerDelay =
      this.screen.width > 1200 ||
      (this.screen.width >= 800 && this.screen.width < 1024)
        ? 80
        : 0;
  }
}
