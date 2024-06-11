import { snaptabLogo } from '../logos';

export const PROJECT_SNAPTAB = {
  logo: snaptabLogo,
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
      path: 'assets/img/snaptab/dashboard/dashboard',
      alt: $localize`Dashboard`,
      ratio:'2.207 / 1'
    },
    {
      path: 'assets/img/snaptab/project_infos/project_infos',
      alt: $localize`Project-Infos`,
      ratio:'2.207 / 1'
    },
    {
      path: 'assets/img/snaptab/todo/todo',
      alt: $localize`Todo`,
      ratio:'2.207 / 1'
    },
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
  video: 'https://www.youtube.com/embed/J-1w14ZlhRA?si=nSgD268KZX4G2xUw',
};
