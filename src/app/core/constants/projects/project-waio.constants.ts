import { ProjectDetails } from 'src/app/features/portfolio/types/project.type';
import svgLogo from 'src/assets/img/projects/waio/waio-logo.svg';

export const PROJECT_WAIO: { type: string } & ProjectDetails = {
  id: 'waio',
  type: $localize`Website`,
  title: 'waio',
  subtitle: $localize`My company site showcasing modern digital solutions with high performance, accessibility, and a fully responsive design.`,
  logo: svgLogo,
  description: $localize`
  This website presents WAIO Applications, my independent software company dedicated to developing innovative, high-performance digital products.<br/><br/>
  Our mission is to create software that combines modern design, clean architecture, and excellent user experience. We build reliable applications that perform consistently well across platforms and devices, ensuring both speed and accessibility.<br/><br/>
  The site reflects our commitment to high-quality engineering and thoughtful design. Every element is optimized to provide a smooth and intuitive browsing experience, from responsive layouts to lightweight animations.<br/><br/>
  At WAIO Applications, we value precision, performance, and clarity in every project we take on. Whether it’s a mobile app, a complex web platform, or a creative experiment, our goal is always to deliver elegant and efficient solutions that make technology feel natural to use.
  `,
  images: [
    {
      path: 'assets/img/projects/waio/home-intro/home-intro',
      alt: `Homepage`,
      ratio: '2',
      backgroundColor: '#0f1418',
    },
    {
      path: 'assets/img/projects/waio/offer/offer',
      alt: `Offer`,
      ratio: '2',
      backgroundColor: '#0f1418',
    },
    {
      path: 'assets/img/projects/waio/devices/devices',
      alt: `Devices`,
      ratio: '2',
      backgroundColor: '#0f1418',
    },
    {
      path: 'assets/img/projects/waio/skills/skills',
      alt: `Skills`,
      ratio: '2',
      backgroundColor: '#0f1418',
    },
    {
      path: 'assets/img/projects/waio/projects-intro/projects-intro',
      alt: `Projects-intro`,
      ratio: '2',
      backgroundColor: '#0f1418',
    },
    {
      path: 'assets/img/projects/waio/projects/projects',
      alt: `Projects`,
      ratio: '2',
      backgroundColor: '#0f1418',
    },
    {
      path: 'assets/img/projects/waio/team-intro/team-intro',
      alt: `Team-Intro`,
      ratio: '2',
      backgroundColor: '#0f1418',
    },
    {
      path: 'assets/img/projects/waio/team-member/team-member',
      alt: `Team-Member`,
      ratio: '2',
      backgroundColor: '#0f1418',
    },
    {
      path: 'assets/img/projects/waio/team-footer/team-footer',
      alt: `Team-Footer`,
      ratio: '2',
      backgroundColor: '#0f1418',
    },
    {
      path: 'assets/img/projects/waio/contact/contact',
      alt: `Contact`,
      ratio: '2',
      backgroundColor: '#0f1418',
    },
    {
      path: 'assets/img/projects/waio/contact-form/contact-form',
      alt: `Contact-Form`,
      ratio: '2',
      backgroundColor: '#0f1418',
    },
    {
      path: 'assets/img/projects/waio/footer/footer',
      alt: `Footer`,
      ratio: '2',
      backgroundColor: '#0f1418',
    },
  ],
  thumbnailPath: 'assets/img/projects/waio/thumbnail/thumbnail',
  websiteUrl: 'https://waio.ch',
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
    highlight: ['Angular', 'Firebase', 'Figma'],
    frontend: ['Angular', 'Typescript', 'HTML', 'SCSS'],
    backend: ['Firebase', 'Node.js'],
    other: ['Figma'],
  },
};
