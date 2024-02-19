import { Component } from '@angular/core';
import { NgxScrollAnimationsModule } from 'ngx-scroll-animations';

@Component({
  selector: 'af-other-projects',
  standalone: true,
  imports: [NgxScrollAnimationsModule],
  templateUrl: './other-projects.component.html',
  styleUrl: './other-projects.component.scss',
})
export class OtherProjectsComponent {
  public items = [
    {
      type: $localize`Website`,
      title: 'waio',
      msg: $localize`Presentation website from the company waio Applications.`,
    },
    {
      type: $localize`IoT`,
      title: 'home_automatic',
      msg: $localize`Home automatic app to automate bee hives and gardens.`,
    },
    {
      type: $localize`Flutter open source`,
      title: 'pro_image_editor',
      msg: $localize`A Flutter widget designed for image editing on any device.`,
    },
    {
      type: $localize`Angular open source`,
      title: 'ngx-scroll-animations',
      msg: $localize`Add automatic scroll animations to an angular 9+ app.`,
    },
    {
      type: $localize`Angular open source`,
      title: 'ngx-image-hero',
      msg: $localize`Easy way that images will fly to the middle of the screen for presentation.`,
    },
    {
      type: $localize`Angular open source`,
      title: 'ngx-count-animation',
      msg: $localize`Count numbers up and down with smooth animation.`,
    },
  ];
}
