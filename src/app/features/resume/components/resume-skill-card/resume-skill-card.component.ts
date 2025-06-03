import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Knowledge } from '../../types/resume.types';

@Component({
  selector: 'af-resume-skill-card',
  templateUrl: './resume-skill-card.component.html',
  styleUrl: './resume-skill-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeSkillCardComponent {
  public item = input.required<Knowledge>();
}
