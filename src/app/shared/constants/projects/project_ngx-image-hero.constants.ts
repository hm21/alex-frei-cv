import { ProjectDetails } from 'src/app/features/portfolio/types/project.type';
import svgOpenSource from 'src/assets/img/icon/open-source-logo.svg';

export const PROJECT_NGX_IMAGE_HERO: { type: string } & ProjectDetails = {
  id: 'ngxImageHero',
  type: $localize`Angular open source`,
  title: 'ngx-image-hero',
  subtitle: $localize`A package for smooth hero animations, letting users tap images to zoom into an immersive full-screen view.`,
  logo: svgOpenSource,
  description: $localize`
    A package to implement hero animations, allowing users to click on images and smoothly zoom them into a larger, 
    immersive view, enhancing the user experience and interaction with images.<br/><br/>
    Please note that the preview below may not appear as smooth as it does in reality. This is because I reduced the frame rate of the GIF to conserve storage space.
    `,
  install: 'npm install ngx-image-hero',
  images: [
    {
      path: 'assets/img/projects/ngx-image-hero/showcase.mp4',
      alt: `Image hero showcase`,
      ratio: '10 / 5.6',
      isVideo: true,
    },
  ],
  demoUrl: 'https://ngx-hm21.web.app/image-hero',
  githubUrl: 'https://github.com/hm21/ngx-image-hero',
  thumbnailPath: 'assets/img/projects/ngx-image-hero/thumbnail/thumbnail',
  website: [
    {
      title: $localize`Github-Page`,
      url: 'https://github.com/hm21/ngx-image-hero',
    },
  ],
  technology: {
    highlight: ['Angular', 'Typescript', 'HTML'],
    frontend: ['Angular', 'Typescript', 'HTML', 'CSS'],
  },
};
