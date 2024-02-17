export const navItems: NavItem[] = [
  {
    path: '/about-me',
    name: $localize`About me`,
    id: 'aboutMe',
  },
  {
    path: '/resume',
    name: $localize`Resume`,
    id: 'resume',
  },
  {
    path: '/portfolio',
    name: $localize`Portfolio`,
    id: 'portfolio',
  },
  {
    path: '/relax',
    name: $localize`Relax`,
    id: 'relax',
  },
  {
    path: '/contact',
    name: $localize`Contact`,
    id: 'contact',
  },
];

interface NavItem {
  path: string;
  name: string;
  id: NavIcon;
  icon?: any;
}
export type NavIcon = 'aboutMe' | 'resume' | 'portfolio' | 'relax' | 'contact';
