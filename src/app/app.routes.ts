import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: { animation: 'HomePage' },
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
