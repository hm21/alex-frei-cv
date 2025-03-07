import svgLogo from 'src/assets/img/projects/snaptab/snaptab-logo.svg';
import { ProjectDetails } from '../../../features/portfolio/interfaces/portfolio.interfaces';

export const PROJECT_SNAPTAB: ProjectDetails = {
  logo: svgLogo,
  title: 'snaptab',
  subtitle: $localize`The Allrounder-Tool for your Company!`,
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
    frontend: ['Angular', 'Flutter', 'Typescript', 'Dart', 'HTML', 'SCSS'],
    backend: [
      'Firebase',
      'Google Cloud',
      'Supabase',
      'Typesense',
      'Node.js',
      'ASP.NET',
      'Azure',
    ],
    prototype: ['Ionic', 'Java', 'libGDX'],
    other: ['Figma', 'Lucidchart', 'Stripe', 'OpenAI-API', 'Github-Actions'],
  },
  images: [
    {
      path: 'assets/img/projects/snaptab/dashboard/dashboard',
      alt: `Dashboard`,
      ratio: '2.207 / 1',
    },
    {
      path: 'assets/img/projects/snaptab/project_infos/project_infos',
      alt: `Project-Infos`,
      ratio: '2.207 / 1',
    },
    {
      path: 'assets/img/projects/snaptab/todo/todo',
      alt: `Todo`,
      ratio: '2.207 / 1',
    },
    {
      path: 'assets/img/projects/snaptab/project/project_mobile',
      alt: `Project`,
    },
    {
      path: 'assets/img/projects/snaptab/employee/employee_web',
      alt: `Employee`,
    },
    {
      path: 'assets/img/projects/snaptab/docs/docs_web',
      alt: `Docs`,
    },
    {
      path: 'assets/img/projects/snaptab/events/events_web',
      alt: `Events`,
    },
    {
      path: 'assets/img/projects/snaptab/gantt/gantt_web',
      alt: `Gantt`,
    },
    {
      path: 'assets/img/projects/snaptab/time/time_mobile',
      alt: `Time`,
    },
    {
      path: 'assets/img/projects/snaptab/client-portal/client-portal_web',
      alt: `Client portal`,
    },
    {
      path: 'assets/img/projects/snaptab/ai/ai_mobile',
      alt: `AI`,
    },
    {
      path: 'assets/img/projects/snaptab/more/more_web',
      alt: `More`,
      backgroundColor: '#ACD2FF',
    },
  ],
  video: 'https://www.youtube.com/embed/J-1w14ZlhRA?si=nSgD268KZX4G2xUw',
};
