import { ProjectDetails } from 'src/app/features/portfolio/types/project.type';
import svgLogo from 'src/assets/img/projects/waio/waio-logo.svg';

export const PROJECT_WAIO: { type: string } & ProjectDetails = {
  id: 'waio',
  type: $localize`Website`,
  title: 'waio',
  subtitle: $localize`My company site featuring two hidden games, an image conversion tool, and a fast, accessible, fully responsive design.`,
  logo: svgLogo,
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
      path: 'assets/img/projects/waio/waio-home/waio-home',
      alt: $localize`Waio Homepage`,
      ratio: '2.21 / 1',
      backgroundColor: '#060B29',
    },
    {
      path: 'assets/img/projects/waio/waio-team/waio-team',
      alt: $localize`Waio Team`,
      ratio: '2.21 / 1',
      backgroundColor: '#060B29',
    },
    {
      path: 'assets/img/projects/waio/waio-game-1/waio-game-1',
      alt: $localize`Waio Game 1`,
      ratio: '2.21 / 1',
      backgroundColor: '#060B29',
    },
    {
      path: 'assets/img/projects/waio/waio-game-2/waio-game-2',
      alt: $localize`Waio Game 2`,
      ratio: '2.21 / 1',
      backgroundColor: '#060B29',
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
