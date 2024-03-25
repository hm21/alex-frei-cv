import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxScrollAnimationsModule } from 'ngx-scroll-animations';

@Component({
  selector: 'af-about-me-skills',
  standalone: true,
  imports: [NgxScrollAnimationsModule],
  templateUrl: './about-me-skills.component.html',
  styleUrl: './about-me-skills.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutMeSkillsComponent {}
