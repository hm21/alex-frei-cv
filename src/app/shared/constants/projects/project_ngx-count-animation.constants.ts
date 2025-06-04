import { ProjectDetails } from 'src/app/features/portfolio/types/project.type';
import svgOpenSource from 'src/assets/img/icon/open-source-logo.svg';

export const PROJECT_COUNT_ANIMATION: { type: string } & ProjectDetails = {
  id:'ngxCountAnimation'
,  type: $localize`Angular open source`,
  title: 'ngx-count-animation',
  subtitle: $localize`A package for smooth, animated number transitions, ideal for counters and real-time data updates.`,
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
  githubUrl: 'https://github.com/hm21/count-animation',
  thumbnailPath: 'assets/img/projects/ngx-count-animation/thumbnail/thumbnail',
  website: [
    {
      title: $localize`Github-Page`,
      url: 'https://github.com/hm21/ngx-count-animation',
    },
  ],
  technology: {
    highlight: ['Angular', 'Typescript', 'HTML'],
    frontend: ['Angular', 'Typescript', 'HTML'],
  },
};
