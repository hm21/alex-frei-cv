import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { NgxScrollAnimationsModule } from 'ngx-scroll-animations';
import { ModalManagerService } from 'src/app/services/modal-manager.service';
import {
  ProjectDetails,
  ProjectDetailsComponent,
} from '../project-details/project-details.component';

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

  public items: ({ type: string; icon: any } & ProjectDetails)[] = [];

  private modalManager = inject(ModalManagerService);

  ngOnInit(): void {
    this.items = [
      {
        type: $localize`Website`,
        title: 'waio',
        subtitle: $localize`Presentation website from the company waio Applications.`,
        icon: this.waio,
        description: '',
        images: [],
        website: [
          {
            title: $localize`Website`,
            url: 'https://waio.ch',
          },
        ],
        technology: {
          frontend: [
            {
              name: 'Angular',
            },
            {
              name: 'Typescript',
            },
            {
              name: 'HTML',
            },
            {
              name: 'SCSS',
            },
          ],
          backend: [
            {
              name: 'Firebase',
            },
            {
              name: 'Node.js',
            },
          ],
          other: [
            {
              name: 'Figma',
            },
          ],
        },
      },
      {
        type: $localize`IoT`,
        title: 'home_automatic',
        subtitle: $localize`Home automatic app to automate bee hives and gardens.`,
        icon: this.iot,
        description: '',
        images: [],
        website: [
          {
            title: $localize`IoT`,
            url: 'https://waio.ch',
          },
        ],
        technology: {
          frontend: [
            {
              name: 'Flutter',
            },
            {
              name: 'Dart',
            },
          ],
          backend: [
            {
              name: 'Supabase',
            },
          ],
          prototype: [
            {
              name: 'Ionic',
            },
            {
              name: 'Angular',
            },
          ],
        },
      },
      {
        type: $localize`Flutter open source`,
        title: 'pro_image_editor',
        subtitle: $localize`A Flutter widget designed for image editing on any device.`,
        icon: this.imageEditor,
        description: '',
        images: [],
        demoUrl: 'https://hm21.github.io/pro_image_editor',
        website: [
          {
            title: $localize`Github-Page`,
            url: 'https://github.com/hm21/pro_image_editor',
          },
        ],
        technology: {
          frontend: [
            {
              name: 'Flutter',
            },
            {
              name: 'Dart',
            },
          ],
          other: [
            {
              name: 'Github-Actions',
            },
          ],
        },
      },
      {
        type: $localize`Angular open source`,
        title: 'ngx-scroll-animations',
        subtitle: $localize`Add automatic scroll animations to an angular 9+ app.`,
        icon: this.openSource,
        description: '',
        images: [],
        demoUrl: 'https://ngx-hm21.web.app/scroll-animations',
        website: [
          {
            title: $localize`Github-Page`,
            url: 'https://github.com/hm21/ngx-scroll-animations',
          },
        ],
        technology: {
          frontend: [
            {
              name: 'Angular',
            },
            {
              name: 'Typescript',
            },
            {
              name: 'HTML',
            },
            {
              name: 'SCSS',
            },
          ],
          other: [
            {
              name: 'Github-Actions',
            },
          ],
        },
      },
      {
        type: $localize`Angular open source`,
        title: 'ngx-image-hero',
        subtitle: $localize`Easy way that images will fly to the middle of the screen for presentation.`,
        icon: this.openSource,
        description: '',
        images: [],
        demoUrl: 'https://ngx-hm21.web.app/image-hero',
        website: [
          {
            title: $localize`Github-Page`,
            url: 'https://github.com/hm21/ngx-image-hero',
          },
        ],
        technology: {
          frontend: [
            {
              name: 'Angular',
            },
            {
              name: 'Typescript',
            },
            {
              name: 'HTML',
            },
            {
              name: 'SCSS',
            },
          ],
          other: [
            {
              name: 'Github-Actions',
            },
          ],
        },
      },
      {
        type: $localize`Angular open source`,
        title: 'ngx-count-animation',
        subtitle: $localize`Count numbers up and down with smooth animation.`,
        icon: this.openSource,
        description: '',
        images: [],
        demoUrl: 'https://ngx-hm21.web.app/count-animation',
        website: [
          {
            title: $localize`Github-Page`,
            url: 'https://github.com/hm21/ngx-count-animation',
          },
        ],
        technology: {
          frontend: [
            {
              name: 'Angular',
            },
            {
              name: 'Typescript',
            },
            {
              name: 'HTML',
            },
            {
              name: 'SCSS',
            },
          ],
          other: [
            {
              name: 'Github-Actions',
            },
          ],
        },
      },
    ];
  }

  public openProject(item: any) {
    this.modalManager.openModal(ProjectDetailsComponent, { data: item });
  }
}
