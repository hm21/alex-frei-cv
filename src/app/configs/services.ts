import { ServiceCard } from '../pages/about-me/components/about-me-services/model/service-card-interface';

export const SERVICES: ServiceCard[] = [
  {
    title: $localize`Websites`,
    msg: $localize`
    As a passionate web developer, I am able to create engaging and fully functional websites. 
    Whether you need a new website or just want to implement new features, I guarantee first-class quality and user satisfaction.
      `,
    icon: 'website',
  },
  {
    title: $localize`Apps`,
    msg: $localize`
    With my experience in the development of mobile and web apps, I create innovative solutions that are tailored to your needs. 
    I attach great importance to user-friendliness and excellent performance so that the app stands out from the competition.
      `,
    icon: 'app',
  },
  {
    title: $localize`Design`,
    msg: $localize`
      Focusing on UI/UX design, I craft intuitive user interfaces for optimal user experience. 
      Creative, technically adept, and user-centric, I enhance interaction and design for maximum efficiency.
      `,
    icon: 'design',
  },
  {
    title: $localize`Backend`,
    msg: $localize`
        As a backend developer, I architect robust and scalable systems to power your applications. 
        From database design to server-side logic, I ensure seamless functionality and reliability.
      `,
    icon: 'backend',
  },
];
