import { waioLogo } from '../logos';
import { ProjectDetails } from '../portfolio-interfaces';

export const PROJECT_WAIO: { type: string } & ProjectDetails = {
  type: $localize`Website`,
  title: 'waio',
  subtitle: $localize`Presentation website from the company waio Applications.`,
  logo: waioLogo,
  description: $localize`
    This website introduces WAIO Applications, my own company. Alongside information about my company, 
    it offers two captivating games to enrich the user experience.<br/>
    You can find one of these games by clicking on the "Team" tab and then pressing the "Icebreaker" button. 
    The other game is hidden as an "easter egg" on the homepage. Simply scroll to the "For all devices" section, 
    click on the red rectangle (which represents a phone with a scale animation).<br/><br/>
    On the subdomain image.waio.ch, we provide a straightforward tool for resizing and converting images to various formats and sizes.<br/><br/>
    The website was designed with a focus on performance and accessibility, and it is fully responsive,
    ensuring a seamless experience across all devices.<br/><br/>
    Most of the UI/UX part of this project is not mine.
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
};
