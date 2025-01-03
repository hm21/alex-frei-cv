import { PROJECT_PRO_IMAGE_EDITOR } from '../pages/portfolio/utils/projects/project-pro_image_editor';
import { PROJECT_SNAPTAB } from '../pages/portfolio/utils/projects/project-snaptab';
import { PROJECT_WAIO } from '../pages/portfolio/utils/projects/project-waio';
import { ResumeTimelineItem } from '../pages/resume/utils/resume.interface';

export const RESUME_TIMELINE_ITEMS: ResumeTimelineItem[] = [
  {
    date: $localize`March 21, 1995`,
    title: $localize`Birthday`,
  },
  {
    date: $localize`2001 - 2010`,
    title: $localize`Elementary school education`,
  },
  {
    date: $localize`2010 - 2014`,
    title: $localize`Apprenticeship for Certified Electrical-Installer EFZ`,
    more: {
      label: $localize`Show certificate`,
      imagePreview: {
        title: $localize`Electrical-Installer certificate`,
        subtitle: $localize`Certificate of apprenticeship for Certified Electrical-Installer EFZ.`,
        items: [
          {
            src: 'assets/img/resume/electrical-installer/efz/efz',
            alt: $localize`EFZ certificate`,
            ratio: '1.413',
            backgroundColor: 'white',
          },
          {
            src: 'assets/img/resume/electrical-installer/efz-note/efz-note',
            alt: $localize`EFZ note`,
            ratio: '0.708',
            backgroundColor: 'white',
          },
          {
            src: 'assets/img/resume/electrical-installer/certificate/certificate',
            alt: $localize`Electrical-Installer certificate`,
            ratio: '0.708',
            backgroundColor: 'white',
          },
          {
            src: 'assets/img/resume/electrical-installer/certificate-extended/certificate-extended',
            alt: $localize`Electrical-Installer certificate extended`,
            ratio: '0.708',
            backgroundColor: 'white',
          },
        ],
      },
    },
  },
  {
    date: $localize`2014 - 2015`,
    title: $localize`Worked by Brunner & Engler as Electrical-Installer`,
  },
  {
    date: $localize`March - November 2015`,
    title: $localize`Military training`,
    msg: $localize`Basic training and training to become a “Wachtmeister”.`,
  },
  {
    date: $localize`2016 - 2020`,
    title: $localize`Worked by Elektro Sutter as Electrical-Installer`,
    msg: $localize`Service technician and project manager. After 2018 change to work only 80% that I have more time for programming.`,
  },
  {
    date: $localize`2017`,
    title: $localize`Learned programming with Java`,
    msg: $localize`Program an “Endless Runner” game with libGDX.`,
    more: {
      label: $localize`Show game screenshots`,
      imagePreview: {
        title: $localize`Endless Runner game`,
        subtitle: $localize`Development screenshots of the “Endless Runner” game that I programmed with libGDX.`,
        items: [
          {
            src: 'assets/img/resume/flying-man/flying-man-home/flying-man-home',
            alt: $localize`Home screen`,
            ratio: '0.54',
          },
          {
            src: 'assets/img/resume/flying-man/flying-man-game/flying-man-game',
            alt: $localize`Game screen`,
            ratio: '0.54',
          },
          {
            src: 'assets/img/resume/flying-man/flying-man-game-over/flying-man-game-over',
            alt: $localize`Game-over screen`,
            ratio: '0.54',
          },
          {
            src: 'assets/img/resume/flying-man/flying-man-score/flying-man-score',
            alt: $localize`Score screen`,
            ratio: '0.54',
          },
        ],
      },
    },
  },
  {
    date: $localize`2017`,
    title: $localize`Project “Report-App”`,
    msg: $localize`Program a simple report app with libGDX for use at the current workplace.`,
  },
  {
    date: $localize`2018`,
    title: $localize`Fiber optic training`,
    msg: $localize`Further training in Eschlikon at “bingesser huber elektro ag” on fiber optic splices as well as outdoor and indoor installation.`,
  },
  {
    date: $localize`2018 - 2019`,
    title: $localize`Changed “Report-App” from libGDX to Ionic`,
    msg: $localize`To make the app more professional and simplify the programming of the app, I changed to Ionic 4.`,
  },
  {
    date: $localize`2020`,
    title: $localize`Foundation of WAIO Applications`,
    msg: $localize`Programing many different things such as website for company and managing tool. 
      Creation of a web app for “Schule Rotflue” which make it easy for them to present the pedagogical concept.`,
    more: {
      label: $localize`See Full Details`,
      projectDetails: PROJECT_WAIO,
    },
  },
  {
    date: $localize`October 24, 2022`,
    title: $localize`Married`,
    msg: $localize`Married with my wife in Vietnam.`,
  },
  {
    date: $localize`January 2, 2024`,
    title: $localize`Open source project “pro_image_editor”`,
    msg: $localize`Developed one of the best open source image editors for Flutter.`,
    more: {
      label: $localize`See Full Details`,
      projectDetails: PROJECT_PRO_IMAGE_EDITOR,
    },
  },
  {
    date: $localize`2021 - Today`,
    title: $localize`Project “snaptab”`,
    msg: $localize`Start converting the old “Report-App” into a professional product based on Angular and Flutter that can be sold.`,
    more: {
      label: $localize`See Full Details`,
      projectDetails: PROJECT_SNAPTAB,
    },
  },
];
