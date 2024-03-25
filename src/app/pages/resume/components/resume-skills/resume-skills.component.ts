import { Component } from '@angular/core';
import { NgxScrollAnimationsModule } from 'ngx-scroll-animations';
import { ProgressbarComponent } from 'src/app/components/progressbar/progressbar.component';
import {
  backendSkills,
  frontendSkills,
  knowledges,
} from 'src/app/configs/resume-skills';
import { SkillItem } from '../../utils/resume-interface';

@Component({
  selector: 'af-resume-skills',
  standalone: true,
  imports: [ProgressbarComponent, NgxScrollAnimationsModule],
  templateUrl: './resume-skills.component.html',
  styleUrl: './resume-skills.component.scss',
})
export class ResumeSkillsComponent {
  /**
   * An array of frontend skills.
   */
  public frontendSkills: SkillItem[] = frontendSkills;

  /**
   * An array of backend skills.
   */
  public backendSkills: SkillItem[] = backendSkills;

  /**
   * An array of knowledge areas.
   */
  public knowledges = knowledges;
}
