import { ProjectDetails } from 'src/app/features/portfolio/types/project.type';
import svgLogo from 'src/assets/img/projects/gemnails/gemnails-logo.svg';

export const PROJECT_GEMNAILS: { type: string } & ProjectDetails = {
  id: 'gemnails',
  type: $localize`Website`,
  title: 'Gem Nails',
  subtitle: $localize`A modern, responsive website for a professional nail studio, highlighting elegance, care, and a relaxing atmosphere.`,
  logo: svgLogo,
  description: $localize`Gem Nails is a stylish and fully responsive website developed for a nail studio based in Zurich and Münchwilen. 
  The site reflects the studio’s values: quality, aesthetics, and a welcoming environment where clients can feel at ease. 
  Visitors can learn about the treatments offered, explore insights into the studio, and easily access essential information such as pricing, location, and opening hours.
  <br/><br/>
  The website was built with performance and user experience in mind, ensuring fast load times and smooth navigation across all devices. 
  Special attention was given to accessibility, clean design, and modern visual presentation. This project demonstrates how a well-crafted digital presence builds trust and attracts new clients.`,
  images: [
    {
      path: 'assets/img/projects/gemnails/home/home',
      alt: `gemnails`,
      ratio: '1.651',
      backgroundColor: '#ffffff',
    },
    {
      path: 'assets/img/projects/gemnails/offer/offer',
      alt: `gemnails`,
      ratio: '1.651',
      backgroundColor: '#ffffff',
    },
    {
      path: 'assets/img/projects/gemnails/pricing/pricing',
      alt: `gemnails`,
      ratio: '1.651',
      backgroundColor: '#ffffff',
    },
    {
      path: 'assets/img/projects/gemnails/gallery/gallery',
      alt: `gemnails`,
      ratio: '1.651',
      backgroundColor: '#ffffff',
    },
    {
      path: 'assets/img/projects/gemnails/contact/contact',
      alt: `gemnails`,
      ratio: '1.651',
      backgroundColor: '#ffffff',
    },
  ],
  websiteUrl: 'https://gemnails.ch',
  website: [
    {
      title: $localize`Website`,
      url: 'https://gemnails.ch',
    },
  ],
  thumbnailPath: 'assets/img/projects/gemnails/thumbnail/thumbnail',
  technology: {
    highlight: ['Angular', 'Firebase', 'Figma'],
    frontend: ['Angular', 'Typescript', 'HTML', 'SCSS'],
    backend: ['Firebase', 'Node.js'],
    other: ['Figma'],
  },
};
