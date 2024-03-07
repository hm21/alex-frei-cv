import { Component } from '@angular/core';
import { NgxScrollAnimationsModule } from 'ngx-scroll-animations';
import { ProgressbarComponent } from 'src/app/components/progressbar/progressbar.component';
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
  public frontendSkills: SkillItem[] = [
    {
      name: `Angular`,
      skill: 100,
    },
    {
      name: `Flutter`,
      skill: 100,
    },
    {
      name: `Typescript / Javascript`,
      skill: 95,
    },
    {
      name: `HTML / CSS`,
      skill: 95,
    },
    {
      name: `Ionic`,
      skill: 85,
    },
  ];

  /**
   * An array of backend skills.
   */
  public backendSkills: SkillItem[] = [
    {
      name: `Firebase`,
      skill: 100,
    },
    {
      name: `Supabase`,
      skill: 85,
    },
    {
      name: `Google Cloud`,
      skill: 80,
    },
    {
      name: `ASP.NET`,
      skill: 30,
    },
    {
      name: `Azure`,
      skill: 20,
    },
  ];

  /**
   * An array of knowledge areas.
   */
  public knowledges = [
    'Figma',
    'Typesense',
    'Elasticsearch',
    'Algolia',
    'Java',
    'libGDX',
    'Unity',
    'Node.js',
    'REST-API',
    'Nativescript',
    'Stripe-API',
    'OpenAI-API',
    'Lucidchart',
    'Xcode',
    'VS-Code',
    'Android-Studio',
    'Github-Actions',
  ];
}
