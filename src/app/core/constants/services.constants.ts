import { ServiceCard } from 'src/app/features/about-me/components/about-me-services/types/service-card-type';

export const SERVICES: ReadonlyArray<ServiceCard> = [
  {
    title: $localize`Websites`,
    msg: $localize`
    Crafting fast, responsive, and user-friendly websites with modern frameworks like Angular. Whether it's a portfolio, 
    a business site, or a full-fledged web app, I build solutions that stand out.
      `,
    icon: 'website',
  },
  {
    title: $localize`Apps`,
    msg: $localize`
    Developing high-performance mobile applications with Flutter or Ionic. I focus on smooth user experiences and cross-platform 
    compatibility to ensure apps work seamlessly on both iOS and Android.
      `,
    icon: 'app',
  },
  {
    title: $localize`Design`,
    msg: $localize`
      Blending aesthetics with functionality. I create clean UI/UX designs that enhance usability and engage users, 
      ensuring an intuitive and visually appealing digital experience.
      `,
    icon: 'design',
  },
  {
    title: $localize`Backend`,
    msg: $localize`
        Building scalable and efficient backends with Node.js, Firebase, and Supabase. 
        From APIs to databases, I make sure everything runs securely and smoothly behind the scenes.
      `,
    icon: 'backend',
  },
];
