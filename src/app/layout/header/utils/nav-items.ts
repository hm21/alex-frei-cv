export const navItems: NavItem[] = [
  {
    path: '/about-me',
    name: $localize`About me`,
    id: 'aboutMe',
    msg: 'Learn more about me.',
  },
  {
    path: '/resume',
    name: $localize`Resume`,
    id: 'resume',
    msg: 'View my resume.',
  },
  {
    path: '/portfolio',
    name: $localize`Portfolio`,
    id: 'portfolio',
    msg: 'Explore my portfolio.',
  },
  {
    path: '/relax',
    name: $localize`Relax`,
    id: 'relax',
    msg: 'Take a break and relax.',
  },
  {
    path: '/contact',
    name: $localize`Contact`,
    id: 'contact',
    msg: 'Get in touch with me.',
  },
];

interface NavItem {
  path: string;
  name: string;
  msg: string;
  id: NavItemId;
  icon?: any;
}
export type NavItemId = 'aboutMe' | 'resume' | 'portfolio' | 'relax' | 'contact';
