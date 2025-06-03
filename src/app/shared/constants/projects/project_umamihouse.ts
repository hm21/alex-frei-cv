import svgLogo from 'src/assets/img/projects/umamihouse/umamihouse-logo.svg';
import { ProjectDetails } from '../../../features/portfolio/interfaces/portfolio.interfaces';

export const PROJECT_UMAMIHOUSE: { type: string } & ProjectDetails = {
  type: $localize`Website`,
  title: 'Umami House',
  subtitle: $localize`A modern, responsive website for a sushi and bubble tea bar, focused on fresh ingredients and modern design`,
  logo: svgLogo,
  description: $localize`Umami House is a stylish and fully responsive website developed for a sushi and bubble tea bar located in the heart of Zurich. 
  The site was designed to reflect the brand’s focus on high-quality ingredients, modern presentation, and a welcoming atmosphere. 
  Visitors can explore the full menu, learn about the restaurant’s concept, and easily find essential information like location and opening hours.
  <br/><br/>
  The website is built with performance and user experience in mind, ensuring fast load times and seamless navigation across all devices. 
  Special attention was given to responsive design, accessibility, and clean visual aesthetics. The project highlights how a well-crafted 
  digital presence can elevate a local business and connect with a broader audience.`,
  images: [
    /*  TODO: Add images after website is done
   {
      path: 'assets/img/projects/umamihouse/thumbnail/thumbnail',
      alt: `Umamihouse`,
      ratio: '16 / 9',
      backgroundColor: '#ffffff',
    }, */
  ],
  websiteUrl: 'https://umamihouse.ch',
  website: [
    {
      title: $localize`Website`,
      url: 'https://umamihouse.ch',
    },
  ],
  thumbnailPath: 'assets/img/projects/umamihouse/thumbnail/thumbnail',
  technology: {
    highlight: ['Angular', 'Firebase', 'Figma'],
    frontend: ['Angular', 'Typescript', 'HTML', 'SCSS'],
    backend: ['Firebase', 'Node.js'],
    other: ['Figma'],
  },
};
