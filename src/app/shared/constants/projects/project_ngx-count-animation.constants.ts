import svgOpenSource from 'src/assets/img/icon/open-source-logo.svg';
import { ProjectDetails } from '../../../features/portfolio/interfaces/portfolio.interfaces';

export const PROJECT_COUNT_ANIMATION: { type: string } & ProjectDetails = {
  type: $localize`Angular open source`,
  title: 'ngx-count-animation',
  subtitle: $localize`Count numbers up and down with smooth animation.`,
  logo: svgOpenSource,
  install: 'npm install ngx-count-animation',
  description: $localize`
      A package that elegantly animates number changes, creating a visually engaging transition from one value to another, 
      perfect for counting or displaying real-time data updates.<br/><br/>
      Please note that the preview below may not appear as smooth as it does in reality. This is because I reduced the frame rate of the GIF to conserve storage space.
    `,
  images: [
    {
      path: 'assets/img/projects/ngx-count-animation/showcase.mp4',
      alt: `Count animation showcase`,
      ratio: '4.86 / 5.61',
      isVideo: true,
    },
  ],
  demoUrl: 'https://ngx-hm21.web.app/count-animation',
  website: [
    {
      title: $localize`Github-Page`,
      url: 'https://github.com/hm21/ngx-count-animation',
    },
  ],
  technology: {
    frontend: ['Angular', 'Typescript', 'HTML'],
  },
};
