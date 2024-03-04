import { Component, OnInit, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgxScrollAnimationsModule } from 'ngx-scroll-animations';
import { TypewriterComponent } from 'src/app/components/typewriter/typewriter.component';
import { ModalManagerService } from 'src/app/services/modal-manager.service';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import {
  ProjectDetailsComponent,
} from '../project-details/project-details.component';
import { snaptabLogo } from '../utils/logos';
import { ProjectDetails } from '../utils/portfolio-interfaces';

@Component({
  selector: 'af-business-projects',
  standalone: true,
  imports: [NgxScrollAnimationsModule, TypewriterComponent],
  templateUrl: './business-projects.component.html',
  styleUrl: './business-projects.component.scss',
})
export class BusinessProjectsComponent
  extends ExtendedComponent
  implements OnInit
{
  /** Safe HTML representation of the logo. */
  public logo!: SafeHtml;

  /** Array of project items. */
  public items = [
    $localize`Company!`,
    $localize`Projects!`,
    $localize`Needs!`,
    $localize`Employees!`,
    $localize`Industry!`,
    $localize`Construction!`,
    $localize`Control!`,
  ];

  /** Modal manager service for opening project details. */
  private modalManager = inject(ModalManagerService);
  /** DomSanitizer for bypassing security. */
  private sanitizer = inject(DomSanitizer);

  override ngOnInit(): void {
    this.logo = this.sanitizer.bypassSecurityTrustHtml(snaptabLogo);

    super.ngOnInit();
  }

  /** Opens the project details modal. */
  public openProject() {
    const data: ProjectDetails = {
      logo: this.logo,
      title: 'snaptab',
      subtitle: 'The Allrounder-Tool for your Company!',
      description: $localize`
          The application snaptab was primarily developed for craftsmen and
          offers a wide range of features. From time tracking to scheduling
          appointments, tasks, project workflows, and even creating invoices and
          quotes, everything is provided. All of this is enhanced with
          artificial intelligence and the ability to collect payments directly
          from customers using Stripe. Through the customer portal, customers
          can directly access data shared by the company.
          <br /><br />
          The application is offered as a web app as well as a mobile app for
          Android and iOS.
          `,
      demoUrl: 'https://app.snaptab.ch/demo',
      website: [
        {
          url: 'https://snaptab.ch',
          title: $localize`Presentation website`,
        },
        {
          url: 'https://app.snaptab.ch',
          title: $localize`Web-app`,
        },
        {
          url: 'https://m.snaptab.ch',
          title: $localize`Mobile-web-app “PWA”`,
        },
        {
          url: 'https://portal.snaptab.ch',
          title: $localize`Client-portal`,
        },
        {
          url: 'https://admin.snaptab.ch',
          title: $localize`Admin-access`,
        },
      ],
      store: [
        {
          url: 'https://apps.apple.com/vn/app/snaptab/id1632397394',
          title: 'App Store',
        },
        {
          url: 'https://play.google.com/store/apps/details?id=ch.waio.snaptab',
          title: 'Google Play',
        },
        {
          url: 'https://appgallery.huawei.com/app/C107547313',
          title: 'App Gallery',
        },
      ],
      technology: {
        frontend: [
          {
            name: 'Angular',
          },
          {
            name: 'Flutter',
          },
          {
            name: 'Typescript',
          },
          {
            name: 'Dart',
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
            name: 'Google Cloud',
          },
          {
            name: 'Supabase',
          },
          {
            name: 'Typesense',
          },
          {
            name: 'Node.js',
          },
          {
            name: 'ASP.NET',
          },
          {
            name: 'Azure',
          },
        ],
        prototype: [
          {
            name: 'Ionic',
          },
          {
            name: 'Java',
          },
          {
            name: 'libGDX',
          },
        ],
        other: [
          {
            name: 'Figma',
          },
          {
            name: 'Lucidchart',
          },
          {
            name: 'Stripe',
          },
          {
            name: 'OpenAI-API',
          },
          {
            name: 'Github-Actions',
          },
        ],
      },
      images: [
        {
          path: 'assets/img/snaptab/project/project_mobile',
          alt: $localize`Project`,
        },
        {
          path: 'assets/img/snaptab/employee/employee_web',
          alt: $localize`Employee`,
        },
        {
          path: 'assets/img/snaptab/docs/docs_web',
          alt: $localize`Docs`,
        },
        {
          path: 'assets/img/snaptab/events/events_web',
          alt: $localize`Events`,
        },
        {
          path: 'assets/img/snaptab/gantt/gantt_web',
          alt: $localize`Gantt`,
        },
        {
          path: 'assets/img/snaptab/time/time_mobile',
          alt: $localize`Time`,
        },
        {
          path: 'assets/img/snaptab/client-portal/client-portal_web',
          alt: $localize`Client portal`,
        },
        {
          path: 'assets/img/snaptab/ai/ai_mobile',
          alt: $localize`AI`,
        },
        {
          path: 'assets/img/snaptab/more/more_web',
          alt: $localize`More`,
          backgroundColor: '#ACD2FF',
        },
      ],
      video: this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://www.youtube.com/embed/J-1w14ZlhRA?si=nSgD268KZX4G2xUw',
      ),
    };
    this.modalManager.openModal(ProjectDetailsComponent, { data });
  }
}
