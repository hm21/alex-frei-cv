import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxScrollAnimationsModule } from 'ngx-scroll-animations';
import { ModalManagerService } from 'src/app/services/modal-manager.service';
import {
  ProjectDetails,
  ProjectDetailsComponent,
} from '../project-details/project-details.component';
import {
  imageEditorLogo,
  iotLogo,
  openSourceLogo,
  waioLogo,
} from '../utils/logos';

@Component({
  selector: 'af-other-projects',
  standalone: true,
  imports: [NgxScrollAnimationsModule, NgTemplateOutlet],
  templateUrl: './other-projects.component.html',
  styleUrl: './other-projects.component.scss',
})
export class OtherProjectsComponent implements OnInit {
  public items: ({ type: string } & ProjectDetails)[] = [];

  private modalManager = inject(ModalManagerService);
  private sanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    this.items = [
      {
        type: $localize`Website`,
        title: 'waio',
        subtitle: $localize`Presentation website from the company waio Applications.`,
        logo: this.sanitizer.bypassSecurityTrustHtml(waioLogo),
        description: $localize`
        You can find one of these games by clicking on the "Team" tab and then pressing the "Icebreaker" button. 
        The other game is hidden as an "easter egg" on the homepage. Simply scroll to the "For all devices" section, 
        click on the red rectangle (which represents a phone with a scale animation).<br/><br/>
        On the subdomain image.waio.ch, we provide a straightforward tool for resizing and converting images to various formats and sizes.
        `,
        images: [
          {
            path: 'assets/img/waio/waio-home/waio-home',
            alt: $localize`Waio Homepage`,
            ratio: '2.21 / 1',
            backgroundColor: '#060B29',
          },
          {
            path: 'assets/img/waio/waio-team/waio-team',
            alt: $localize`Waio Team`,
            ratio: '2.21 / 1',
            backgroundColor: '#060B29',
          },
          {
            path: 'assets/img/waio/waio-game-1/waio-game-1',
            alt: $localize`Waio Game 1`,
            ratio: '2.21 / 1',
            backgroundColor: '#060B29',
          },
          {
            path: 'assets/img/waio/waio-game-2/waio-game-2',
            alt: $localize`Waio Game 2`,
            ratio: '2.21 / 1',
            backgroundColor: '#060B29',
          },
        ],
        website: [
          {
            title: $localize`Website`,
            url: 'https://waio.ch',
          },
          {
            title: $localize`Website`,
            url: 'https://image.waio.ch',
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
        type: $localize`Flutter open source`,
        title: 'pro_image_editor',
        subtitle: $localize`A Flutter widget designed for image editing on any device.`,
        logo: this.sanitizer.bypassSecurityTrustHtml(imageEditorLogo),
        description: $localize`
        The ProImageEditor is a Flutter widget designed for image editing. It provides a flexible and convenient way to integrate image editing capabilities 
        into Flutter projects. The editor has a great hit detection ensuring that drawing actions are triggered only when the user actively hovers over the drawing area. 
        Furthermore, the editor is highly customizable, allowing for complete adaptation to specific project requirements, and it offers effortless translation capabilities, 
        simplifying the localization process.
        `,
        images: [
          {
            path: 'assets/img/pro_image_editor/showcase/showcase',
            alt: $localize`Editor showcase`,
            ratio: '1 / 1',
            backgroundColor: '#000000',
          },
          {
            path: 'assets/img/pro_image_editor/paint-editor',
            alt: $localize`Painting editor`,
            ratio: '1 / 1.26',
            isGif: true,
            backgroundColor: '#000000',
          },
          {
            path: 'assets/img/pro_image_editor/text-editor',
            alt: $localize`Text editor`,
            ratio: '1 / 1.26',
            isGif: true,
            backgroundColor: '#000000',
          },
          {
            path: 'assets/img/pro_image_editor/crop-rotate-editor',
            alt: $localize`Crop rotate`,
            ratio: '1 / 1.26',
            isGif: true,
            backgroundColor: '#000000',
          },
          {
            path: 'assets/img/pro_image_editor/filter-editor',
            alt: $localize`Filter editor`,
            ratio: '1 / 1.26',
            isGif: true,
            backgroundColor: '#000000',
          },
          {
            path: 'assets/img/pro_image_editor/emoji-editor',
            alt: $localize`Emoji editor`,
            ratio: '1 / 1.26',
            isGif: true,
            backgroundColor: '#000000',
          },
          {
            path: 'assets/img/pro_image_editor/sticker-editor',
            alt: $localize`Sticker editor`,
            ratio: '1 / 1.07',
            isGif: true,
            backgroundColor: '#000000',
          },
        ],
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
        logo: this.sanitizer.bypassSecurityTrustHtml(openSourceLogo),
        description: $localize`
        A package for implementing CSS scroll animations on elements. These animations activate when an element enters the viewport during page scrolling. 
        Users have the flexibility to configure the animations to trigger multiple times or just once. Additionally, 
        the package offers pre-made animations as well as the option to create custom ones to suit various requirements.
       `,
        install: 'npm install ngx-scroll-animations',
        images: [
          {
            path: 'assets/img/ngx-scroll-animations/showcase',
            alt: $localize`Scroll animations showcase`,
            ratio: '7 / 3.9',
            isGif: true,
          },
        ],
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
        },
      },
      {
        type: $localize`Angular open source`,
        title: 'ngx-image-hero',
        subtitle: $localize`Easy way that images will fly to the middle of the screen for presentation.`,
        logo: this.sanitizer.bypassSecurityTrustHtml(openSourceLogo),
        description: $localize`
        A package to implement hero animations, allowing users to click on images and smoothly zoom them into a larger, 
        immersive view, enhancing the user experience and interaction with images.<br/><br/>
        Please note that the preview below may not appear as smooth as it does in reality. This is because I reduced the frame rate of the GIF to conserve storage space.
        `,
        install: 'npm install ngx-image-hero',
        images: [
          {
            path: 'assets/img/ngx-image-hero/showcase',
            alt: $localize`Image hero showcase`,
            ratio: '10 / 5.6',
            isGif: true,
          },
        ],
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
              name: 'CSS',
            },
          ],
        },
      },
      {
        type: $localize`Angular open source`,
        title: 'ngx-count-animation',
        subtitle: $localize`Count numbers up and down with smooth animation.`,
        logo: this.sanitizer.bypassSecurityTrustHtml(openSourceLogo),
        install: 'npm install ngx-count-animation',
        description: $localize`
          A package that elegantly animates number changes, creating a visually engaging transition from one value to another, 
          perfect for counting or displaying real-time data updates.<br/><br/>
          Please note that the preview below may not appear as smooth as it does in reality. This is because I reduced the frame rate of the GIF to conserve storage space.
        `,
        images: [
          {
            path: 'assets/img/ngx-count-animation/showcase',
            alt: $localize`Count animation showcase`,
            ratio: '4.86 / 5.61',
            isGif: true,
          },
        ],
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
          ],
        },
      },
      {
        type: $localize`IoT`,
        title: 'smarthome',
        subtitle: $localize`Smarthome app to automate bee hives and gardens.`,
        logo: this.sanitizer.bypassSecurityTrustHtml(iotLogo),
        description: $localize`
        This project is a real-time control application. Users can directly program the functions of GPIO ports without requiring any programming knowledge. 
        Additionally, users can access data about the personal beehive, including real-time temperature readings and the amount of honey produced by the bees.
        `,
        images: [
          {
            path: 'assets/img/smarthome/bee_overview/bee_overview',
            alt: $localize`Smarthome bee overview`,
            ratio: '1.12 / 1.94',
          },
          {
            path: 'assets/img/smarthome/bee_details/bee_details',
            alt: $localize`Smarthome bee details`,
            ratio: '1.12 / 1.94',
          },
          {
            path: 'assets/img/smarthome/switch/switch',
            alt: $localize`Smarthome switch`,
            ratio: '1.12 / 1.94',
          },
          {
            path: 'assets/img/smarthome/ionic-version/ionic-version',
            alt: $localize`Smarthome Ionic version`,
            ratio: '1 / 2.2',
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
            {
              name: '.NET IoT',
            },
            {
              name: 'C#',
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
    ];
  }

  public openProject(item: any) {
    this.modalManager.openModal(ProjectDetailsComponent, { data: item });
  }
}
