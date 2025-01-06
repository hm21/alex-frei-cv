import svgSmarthome from 'src/assets/img/smarthome/smarthome-logo.svg';
import { ProjectDetails } from '../../../features/portfolio/interfaces/portfolio.interfaces';

export const PROJECT_SMART_HOME: { type: string } & ProjectDetails = {
  type: $localize`IoT`,
  title: 'smarthome',
  subtitle: $localize`Smarthome app to automate bee hives and gardens.`,
  logo: svgSmarthome,
  description: $localize`
    This project is a real-time control application. Users can directly program the functions of GPIO ports without requiring any programming knowledge. 
    Additionally, users can access data about the personal beehive, including real-time temperature readings and the amount of honey produced by the bees.
    `,
  images: [
    {
      path: 'assets/img/smarthome/bee_overview/bee_overview',
      alt: `Smarthome bee overview`,
      ratio: '1.12 / 1.94',
    },
    {
      path: 'assets/img/smarthome/bee_details/bee_details',
      alt: `Smarthome bee details`,
      ratio: '1.12 / 1.94',
    },
    {
      path: 'assets/img/smarthome/switch/switch',
      alt: `Smarthome switch`,
      ratio: '1.12 / 1.94',
    },
    {
      path: 'assets/img/smarthome/ionic-version/ionic-version',
      alt: `Smarthome Ionic version`,
      ratio: '1 / 2.2',
    },
  ],
  technology: {
    frontend: ['Flutter', 'Dart', '.NET IoT', 'C#'],
    backend: ['Supabase'],
    prototype: ['Ionic', 'Angular'],
  },
};
