import svgSmarthome from 'src/assets/img/projects/smarthome/smarthome-logo.svg';
import { ProjectDetails } from '../../../features/portfolio/interfaces/portfolio.interfaces';

export const PROJECT_SMART_HOME: { type: string } & ProjectDetails = {
  type: $localize`IoT`,
  title: 'smarthome',
  subtitle: $localize`A real-time control app for managing GPIO ports and monitoring personal beehives, with no coding required.`,
  logo: svgSmarthome,
  description: $localize`This project is a real-time control application designed to simplify hardware interaction. 
  It allows users to configure and control GPIO ports through an intuitive interface—no programming skills needed. <br/>
  Beyond GPIO control, the app also connects to a personal beehive system, providing live data such as internal temperature and honey production levels. 
  This combination of real-time control and smart monitoring makes it a powerful tool for hobbyists and makers alike.
    `,
  images: [
    {
      path: 'assets/img/projects/smarthome/bee_overview/bee_overview',
      alt: `Smarthome bee overview`,
      ratio: '1.12 / 1.94',
    },
    {
      path: 'assets/img/projects/smarthome/bee_details/bee_details',
      alt: `Smarthome bee details`,
      ratio: '1.12 / 1.94',
    },
    {
      path: 'assets/img/projects/smarthome/switch/switch',
      alt: `Smarthome switch`,
      ratio: '1.12 / 1.94',
    },
    {
      path: 'assets/img/projects/smarthome/ionic-version/ionic-version',
      alt: `Smarthome Ionic version`,
      ratio: '1 / 2.2',
    },
  ],
  thumbnailPath: 'assets/img/projects/smarthome/thumbnail/thumbnail',
  technology: {
    highlight: ['Flutter', '.NET IoT', 'C#'],
    frontend: ['Flutter', 'Dart', '.NET IoT', 'C#'],
    backend: ['Supabase'],
    prototype: ['Ionic', 'Angular'],
  },
};
