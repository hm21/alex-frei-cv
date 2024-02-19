import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgxScrollAnimationsModule } from 'ngx-scroll-animations';

@Component({
  selector: 'af-other-projects',
  standalone: true,
  imports: [NgxScrollAnimationsModule, NgTemplateOutlet],
  templateUrl: './other-projects.component.html',
  styleUrl: './other-projects.component.scss',
})
export class OtherProjectsComponent implements OnInit {
  @ViewChild('waio', { read: TemplateRef, static: true })
  waio!: TemplateRef<any>;
  @ViewChild('imageEditor', { read: TemplateRef, static: true })
  imageEditor!: TemplateRef<any>;
  @ViewChild('iot', { read: TemplateRef, static: true })
  iot!: TemplateRef<any>;
  @ViewChild('openSource', { read: TemplateRef, static: true })
  openSource!: TemplateRef<any>;

  public items: any[] = [];

  ngOnInit(): void {
    this.items = [
      {
        type: $localize`Website`,
        title: 'waio',
        msg: $localize`Presentation website from the company waio Applications.`,
        icon: this.waio,
      },
      {
        type: $localize`IoT`,
        title: 'home_automatic',
        msg: $localize`Home automatic app to automate bee hives and gardens.`,
        icon: this.iot,
      },
      {
        type: $localize`Flutter open source`,
        title: 'pro_image_editor',
        msg: $localize`A Flutter widget designed for image editing on any device.`,
        icon: this.imageEditor,
      },
      {
        type: $localize`Angular open source`,
        title: 'ngx-scroll-animations',
        msg: $localize`Add automatic scroll animations to an angular 9+ app.`,
        icon: this.openSource,
      },
      {
        type: $localize`Angular open source`,
        title: 'ngx-image-hero',
        msg: $localize`Easy way that images will fly to the middle of the screen for presentation.`,
        icon: this.openSource,
      },
      {
        type: $localize`Angular open source`,
        title: 'ngx-count-animation',
        msg: $localize`Count numbers up and down with smooth animation.`,
        icon: this.openSource,
      },
    ];
  }
}
