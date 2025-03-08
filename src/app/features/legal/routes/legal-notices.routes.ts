import { Routes } from '@angular/router';

const rawRoutes: Routes = [
  {
    path: 'imprint',
    data: { preload: false, animation: 'ImprintPage' },
    loadComponent: () =>
      import('../pages/imprint/imprint.component').then(
        (m) => m.ImprintComponent,
      ),
  },
  {
    path: 'privacy',
    data: { preload: false, animation: 'PrivacyPage' },
    loadComponent: () =>
      import('../pages/privacy/privacy.component').then(
        (m) => m.PrivacyComponent,
      ),
  },
];

export const LEGAL_NOTICES_ROUTES: Routes = [
  ...rawRoutes,
  {
    path: 'protected',
    children: rawRoutes,
  },
];
