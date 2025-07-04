import { ProjectDetails } from 'src/app/features/portfolio/types/project.type';
import svgLogo from 'src/assets/img/projects/electronic/electronic-logo.svg';

export const PROJECT_ELECTRONIC: ProjectDetails = {
  id: 'electronic',
  logo: svgLogo,
  title: $localize`Electronic and Robotic`,
  subtitle: $localize`Stuff like IoT is fun, but having complete freedom is even better, especially when you build your own electronic board.`,
  description: $localize`I guess everyone who starts with IoT has tried out a Raspberry Pi or Arduino. But you will quickly realize that for more 
  complex use cases, they have their limitations. And buying a bunch of extension boards can get pretty expensive. 
  So why not just build your own electronic board? That’s exactly what I did, I designed the board, had it manufactured in China, 
  and then soldered all the components onto it myself.
  <br/><br/>
  Besides that, I also enjoy tinkering with mechanics to build simple robots, like the ones you can see in the videos below.
`,
  demoUrl: undefined,
  websiteUrl: undefined,
  technology: {
    highlight: ['IoT.net', 'C#', 'Java', 'EasyEDA', 'Android-Things'],
    other: ['IoT.net', 'C#', 'Java', 'EasyEDA', 'Android-Things'],
  },
  thumbnailPath: 'assets/img/projects/electronic/thumbnail/thumbnail',
  images: [
    {
      path: 'assets/img/projects/electronic/schema/schema',
      alt: `Schema`,
      ratio: '1.095 / 1',
      backgroundColor: '#000000',
    },
    {
      path: 'assets/img/projects/electronic/switch/switch',
      alt: `Switch`,
      ratio: '1.0933 / 1',
      backgroundColor: '#000000',
    },
    {
      path: 'assets/img/projects/electronic/digital/digital',
      alt: `Digital`,
      ratio: '1.531 / 1',
      backgroundColor: '#000000',
    },
    {
      path: 'assets/img/projects/electronic/analog/analog',
      alt: `Analog`,
      ratio: '1.3526 / 1',
      backgroundColor: '#000000',
    },
    {
      path: 'assets/img/projects/electronic/production/production',
      alt: `Production`,
      ratio: '1.4395 / 1',
      backgroundColor: '#000000',
    },
    {
      path: 'assets/img/projects/electronic/switch-complete/switch-complete',
      alt: `Switch-Complete`,
      ratio: '1.153 / 1',
      backgroundColor: '#000000',
    },
    {
      path: 'assets/videos/projects/electronic/robot-slave.mp4',
      alt: `Robot-Slave`,
      ratio: '16 / 9',
      isVideo: true,
      disableVideoAutoplay: true,
      backgroundColor: '#000000',
    },
    {
      path: 'assets/videos/projects/electronic/robot-hands.mp4',
      alt: `Robot-Hands`,
      ratio: '16 / 9',
      isVideo: true,
      disableVideoAutoplay: true,
      backgroundColor: '#000000',
    },
  ],
};
