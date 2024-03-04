import { Component } from '@angular/core';
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
  public items: ResumeTimelineItem[] = [
    {
      date: $localize`March 21, 1995`,
      title: $localize`Birthday`,
    },
    {
      date: $localize`2001 - 2010`,
      title: $localize`Elementary school education`,
    },
    {
      date: $localize`2010 - 2014`,
      title: $localize`Apprenticeship for Certified Electrical-Installer EFZ`,
    },
    {
      date: $localize`2014 - 2015`,
      title: $localize`Worked by Brunner & Engler as Electrical-Installer`,
    },
    {
      date: $localize`March - November 2015`,
      title: $localize`Military training`,
      msg: $localize`Basic training and training to become a “Wachtmeister”.`,
    },
    {
      date: $localize`2016 - 2020`,
      title: $localize`Worked by Elektro Sutter as Electrical-Installer`,
      msg: $localize`Service technician and project manager. After 2018 change to work only 80% that I have more time for programming.`,
    },
    {
      date: $localize`2017`,
      title: $localize`Learned programming with Java`,
      msg: $localize`Program an “Endless Runner” game with libGDX`,
    },
    {
      date: $localize`2017`,
      title: $localize`Started “Report-App” Project`,
      msg: $localize`Program a simple report app with libGDX for use at the current workplace.`,
    },
    {
      date: $localize`2018`,
      title: $localize`Fiber optic training`,
      msg: $localize`Further training in Eschlikon at “bingesser huber elektro ag” on fiber optic splices as well as outdoor and indoor installation`,
    },
    {
      date: $localize`2018 - 2019`,
      title: $localize`Changed “Report-App” from libGDX to Ionic`,
      msg: $localize`To make the app more professional and simplify the programming of the app, I changed to Ionic 4.`,
    },
    {
      date: $localize`2020`,
      title: $localize`Foundation of WAIO Applications`,
      msg: $localize`Programing many different things such as website for company and managing tool. 
      Creation of a web app for “Schule Rotflue” which make it easy for them to present the pedagogical concept.`,
    },
    {
      date: $localize`October 24, 2022`,
      title: $localize`Married`,
      msg: $localize`Married with my wife in Vietnam.`,
    },
    {
      date: $localize`2021 - Today`,
      title: $localize`Project “snaptab”`,
      msg: $localize`Start converting the old “Report-App” into a professional product based on Angular and Flutter that can be sold.`,
    },
  ];
}
