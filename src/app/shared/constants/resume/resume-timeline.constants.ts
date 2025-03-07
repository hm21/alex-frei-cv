import { ResumeTimelineItem } from 'src/app/features/resume/interfaces/resume.interface';
import { PROJECT_PRO_IMAGE_EDITOR } from 'src/app/shared/constants/projects/project-pro_image_editor.constants';
import { PROJECT_SNAPTAB } from 'src/app/shared/constants/projects/project-snaptab.constants';
import { PROJECT_WAIO } from 'src/app/shared/constants/projects/project-waio.constants';

export const RESUME_TIMELINE_ITEMS: ResumeTimelineItem[] = [
  {
    date: $localize`2021 - Today`,
    title: $localize`Project “snaptab”`,
    msg: $localize`Snaptab is a smart all-in-one app designed to optimize business administration. From project management and time tracking to invoicing, snaptab automates administrative processes and saves valuable time.`,
    more: {
      label: $localize`View Details`,
      projectDetails: PROJECT_SNAPTAB,
    },
  },
  {
    date: $localize`January 2024`,
    title: $localize`Open Source Flutter “pro_image_editor”`,
    msg: $localize`A high-performance open-source image editor for Flutter, featuring multi-threading, CPU control, cropping, rotation, filters, text layers, pixelation, and non-destructive editing.`,
    more: {
      label: $localize`View Details`,
      projectDetails: PROJECT_PRO_IMAGE_EDITOR,
    },
    enableGitStats: true,
    repoName: 'pro_image_editor',
  },
  {
    date: $localize`December 2023`,
    title: $localize`Open Source Angular Utilities`,
    msg: $localize`A set of lightweight libraries for smooth scroll animations, immersive image transitions, and dynamic number effects—enhancing user experience with minimal effort.`,
    more: {
      label: $localize`View Details`,
      imagePreview: {
        title: $localize`Open Source Angular Utilities`,
        subtitle: $localize`A set of lightweight libraries for smooth scroll animations, immersive image transitions, and dynamic number effects—enhancing user experience with minimal effort.`,
        items: [
          {
            path: 'assets/img/projects/ngx-count-animation/showcase.mp4',
            alt: `Count animation showcase`,
            ratio: '0.88',
            isVideo: true,
            backgroundColor: 'white',
          },
          {
            path: 'assets/img/projects/ngx-image-hero/showcase.mp4',
            alt: `Image hero showcase`,
            ratio: '10 / 5.6',
            isVideo: true,
            backgroundColor: 'white',
          },
          {
            path: 'assets/img/projects/ngx-scroll-animations/showcase.mp4',
            alt: `Scroll animations showcase`,
            ratio: '7 / 3.9',
            isVideo: true,
            backgroundColor: 'white',
          },
        ],
      },
    },
  },
  /* 
  {
    date: $localize`October 24, 2022`,
    title: $localize`Married`,
    msg: $localize`Married with my wife in Vietnam.`,
  },
  */
  {
    date: $localize`2020`,
    title: $localize`Founded WAIO Applications`,
    msg: $localize`Developed various projects, including the company website and a management tool. Created a web app for “Schule Rotflue” to simplify the presentation of their pedagogical concept.`,
    more: {
      label: $localize`View Details`,
      projectDetails: PROJECT_WAIO,
    },
  },
  {
    date: $localize`2018 - 2019`,
    title: $localize`Project “Report-App” Ionic version`,
    msg: $localize`I developed a report app with Ionic for craftsmen to simplify report creation and management. Lessons from this project laid the foundation for snaptab’s enhanced features and functionality.`,
  },
  {
    date: $localize`Mid-2018`,
    title: $localize`Fiber optic training`,
    msg: $localize`Completed a three-month training in Eschlikon at Bingesser Huber Elektro AG, gaining hands-on experience in fiber optic splicing, as well as outdoor and indoor installations.`,
  },
  {
    date: $localize`Mid-2017`,
    title: $localize`Project “Report-App” Java version`,
    msg: $localize`My first major project, a simple report app built with Java and libGDX, developed for use at my workplace. It provided valuable experience in mobile development and future projects.`,
  },
  {
    date: $localize`Early 2017`,
    title: $localize`Java Development and Game Programming`,
    msg: $localize`Learned programming with Java and developed an Endless Runner game using libGDX, gaining hands-on experience in game development and software design.`,
    more: {
      label: $localize`Show game screenshots`,
      imagePreview: {
        title: $localize`Endless Runner game`,
        subtitle: $localize`Development screenshots of the “Endless Runner” game that I programmed with libGDX.`,
        items: [
          {
            path: 'assets/img/resume/flying-man/flying-man-home/flying-man-home',
            alt: $localize`Game screen`,
            ratio: '0.54',
          },
          {
            path: 'assets/img/resume/flying-man/flying-man-game/flying-man-game',
            alt: $localize`Game screen`,
            ratio: '0.54',
          },
          {
            path: 'assets/img/resume/flying-man/flying-man-game-over/flying-man-game-over',
            alt: $localize`Game screen`,
            ratio: '0.54',
          },
          {
            path: 'assets/img/resume/flying-man/flying-man-score/flying-man-score',
            alt: $localize`Game screen`,
            ratio: '0.54',
          },
        ],
      },
    },
  },
  {
    date: $localize`2016 - 2020`,
    title: $localize`Elektro Sutter – Electrical Installer`,
    msg: $localize`Worked as an electrical installer, service technician, and project manager at Elektro Sutter. In 2018, transitioned to an 80% workload to dedicate more time to programming.`,
  },
  {
    date: $localize`March - November 2015`,
    title: $localize`Military Training`,
    msg: $localize`Completed basic training followed by advanced training to achieve the rank of Wachtmeister.`,
  },
  {
    date: $localize`2014 - 2015`,
    title: $localize`Brunner & Engler – Electrical Installer`,
    msg: $localize`Worked as an electrical installer, gaining hands-on experience in installations and electrical systems.`,
  },
  {
    date: $localize`2010 - 2014`,
    title: $localize`Apprenticeship – Certified Electrical Installer EFZ`,
    msg: $localize`Completed a vocational apprenticeship, earning the EFZ certification as an electrical installer, with practical experience in electrical systems and installations.`,
    more: {
      label: $localize`Show certificate`,
      imagePreview: {
        title: $localize`Electrical-Installer certificate`,
        subtitle: $localize`Certificate of apprenticeship for Certified Electrical-Installer EFZ.`,
        items: [
          {
            path: 'assets/img/resume/electrical-installer/efz/efz',
            alt: $localize`Electrical-Installer certificate`,
            ratio: '1.413',
            backgroundColor: 'white',
          },
          {
            path: 'assets/img/resume/electrical-installer/efz-note/efz-note',
            alt: $localize`Electrical-Installer certificate`,
            ratio: '0.708',
            backgroundColor: 'white',
          },
          {
            path: 'assets/img/resume/electrical-installer/certificate/certificate',
            alt: $localize`Electrical-Installer certificate`,
            ratio: '0.708',
            backgroundColor: 'white',
          },
          {
            path: 'assets/img/resume/electrical-installer/certificate-extended/certificate-extended',
            alt: $localize`Electrical-Installer certificate`,
            ratio: '0.708',
            backgroundColor: 'white',
          },
        ],
      },
    },
  },
  {
    date: $localize`2001 - 2010`,
    title: $localize`Elementary School`,
    msg: $localize`Completed basic primary education.`,
  },
  {
    date: $localize`March 21, 1995`,
    title: $localize`Birthday`,
    msg: $localize`Just a baby, no coding skills yet!`,
  },
];
