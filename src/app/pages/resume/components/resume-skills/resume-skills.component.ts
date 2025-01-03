import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { NgxScrollAnimationsDirective } from 'ngx-scroll-animations';
import { ProgressBarComponent } from 'src/app/components/progress-bar/progress-bar.component';
import {
  BACKEND_SKILLS,
  FRONTEND_SKILLS,
  KNOWLEDGE,
} from 'src/app/configs/resume-skills';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { SkillItem } from '../../utils/resume.interface';

@Component({
  selector: 'af-resume-skills',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProgressBarComponent, NgxScrollAnimationsDirective],
  templateUrl: './resume-skills.component.html',
  styleUrl: './resume-skills.component.scss',
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
