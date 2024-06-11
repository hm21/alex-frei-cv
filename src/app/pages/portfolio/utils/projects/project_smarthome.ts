import { iotLogo } from '../logos';
import { ProjectDetails } from '../portfolio-interfaces';

export const PROJECT_SMARTHOME: { type: string } & ProjectDetails = {
  type: $localize`IoT`,
  title: 'smarthome',
  subtitle: $localize`Smarthome app to automate bee hives and gardens.`,
  logo: iotLogo,
  description: $localize`
    This project is a real-time control application. Users can directly program the functions of GPIO ports without requiring any programming knowledge. 
    Additionally, users can access data about the personal beehive, including real-time temperature readings and the amount of honey produced by the bees.
    `,
  images: [
    {
      path: 'assets/img/smarthome/bee_overview/bee_overview',
      alt: $localize`Smarthome bee overview`,
      ratio: '1.12 / 1.94',
    },
    {
      path: 'assets/img/smarthome/bee_details/bee_details',
      alt: $localize`Smarthome bee details`,
      ratio: '1.12 / 1.94',
    },
    {
      path: 'assets/img/smarthome/switch/switch',
      alt: $localize`Smarthome switch`,
      ratio: '1.12 / 1.94',
    },
    {
      path: 'assets/img/smarthome/ionic-version/ionic-version',
      alt: $localize`Smarthome Ionic version`,
      ratio: '1 / 2.2',
    },
  ],
  technology: {
    frontend: [
      {
        name: 'Flutter',
      },
      {
        name: 'Dart',
      },
      {
        name: '.NET IoT',
      },
      {
        name: 'C#',
      },
    ],
    backend: [
      {
        name: 'Supabase',
      },
    ],
    prototype: [
      {
        name: 'Ionic',
      },
      {
        name: 'Angular',
      },
    ],
  },
};
