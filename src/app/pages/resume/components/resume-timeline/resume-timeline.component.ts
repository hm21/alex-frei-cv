import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'af-resume-timeline',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './resume-timeline.component.html',
  styleUrl: './resume-timeline.component.scss',
  animations: [
    trigger('sonarAnimation', [
      transition('* => true', [
        animate(
          '1200ms ease',
          keyframes([
            style({
              transform: 'translate(-50%, -50%) scale(0)',
              opacity: 0.8,
              offset: 0,
            }),
            style({
              transform: 'translate(-50%, -50%) scale(2)',
              opacity: 0,
              offset: 1,
            }),
          ]),
        ),
      ]),
    ]),
  ],
})
export class ResumeTimelineComponent {
  public items = [
    {
      date: new Date(1995, 2, 21, 0, 5),
      title: $localize`Birthday`,
      hovered: false,
    },
    {
      date: new Date(1995, 2, 21),
      title: $localize`Lehre`,
      hovered: false,
    },
    {
      date: new Date(1995, 2, 21),
      title: $localize`Arbeit Brunner und Engler`,
      hovered: false,
    },
    {
      date: new Date(1995, 2, 21),
      title: $localize`Arbeit Elektro Sutter`,
      hovered: false,
    },
    {
      date: new Date(1995, 2, 21),
      title: $localize`Militär`,
      hovered: false,
    },
    {
      date: new Date(1995, 2, 21),
      title: $localize`Programmieren lernen`,
      hovered: false,
    },
    {
      date: new Date(1995, 2, 21),
      title: $localize`Projektstart "Rapport-App"`,
      hovered: false,
    },
    {
      date: new Date(1995, 2, 21),
      title: $localize`Gründung WAIO Applications`,
      hovered: false,
    },
    {
      date: new Date(1995, 2, 21),
      title: $localize`Projektstart "snaptab"`,
      hovered: false,
    },
  ];
}
