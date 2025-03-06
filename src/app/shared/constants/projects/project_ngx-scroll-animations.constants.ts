import svgOpenSource from 'src/assets/img/icon/open-source-logo.svg';
import { ProjectDetails } from '../../../features/portfolio/interfaces/portfolio.interfaces';

export const PROJECT_NGX_SCROLL_ANIMATIONS: { type: string } & ProjectDetails =
  {
    type: $localize`Angular open source`,
    title: 'ngx-scroll-animations',
    subtitle: $localize`Add automatic scroll animations to an angular 9+ app.`,
    logo: svgOpenSource,
    description: $localize`
    A package for implementing CSS scroll animations on elements. These animations activate when an element enters the viewport during page scrolling. 
    Users have the flexibility to configure the animations to trigger multiple times or just once. Additionally, 
    the package offers pre-made animations as well as the option to create custom ones to suit various requirements.
   `,
    install: 'npm install ngx-scroll-animations',
    images: [
      {
        path: 'assets/img/ngx-scroll-animations/showcase.mp4',
        alt: `Scroll animations showcase`,
        ratio: '7 / 3.9',
        isVideo: true,
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
      frontend: ['Angular', 'Typescript', 'HTML', 'SCSS'],
    },
  };
