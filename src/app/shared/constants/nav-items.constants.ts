import { NavItem } from '../../layout/header/interfaces/nav-item.interface';

/**
 * Array of navigation items.
 */
export const NAV_ITEMS: ReadonlyArray<NavItem> = [
  {
    path: '/about-me',
    name: $localize`About me`,
    id: 'aboutMe',
    msg: $localize`Learn more about me.`,
  },
  {
    path: '/portfolio',
    name: $localize`Portfolio`,
    id: 'portfolio',
    msg: $localize`Explore my portfolio.`,
  },
  {
    path: '/resume',
    name: $localize`Resume`,
    id: 'resume',
    msg: $localize`View my resume.`,
  },
  {
    path: '/relax',
    name: $localize`Relax`,
    id: 'relax',
    msg: $localize`Take a break and relax.`,
  },
  {
    path: '/contact',
    name: $localize`Contact`,
    id: 'contact',
    msg: $localize`Get in touch with me.`,
  },
];
