import { Routes } from '@angular/router';
import { relaxRoutes } from './features/relax/relax.routes';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/about-me' },
  {
    path: 'about-me',
    data: { animation: 'AboutMePage' },
    loadComponent: () =>
      import('./features/about-me/about-me.component').then(
        (m) => m.AboutMeComponent,
      ),
  },
  {
    path: 'resume',
    data: { animation: 'ResumePage' },
    loadComponent: () =>
      import('./features/resume/resume.component').then((m) => m.ResumeComponent),
  },
  {
    path: 'portfolio',
    data: { animation: 'PortfolioPage' },
    loadComponent: () =>
      import('./features/portfolio/portfolio.component').then(
        (m) => m.PortfolioComponent,
      ),
  },
  ...relaxRoutes,
  {
    path: 'contact',
    data: { animation: 'ContactPage' },
    loadComponent: () =>
      import('./features/contact/contact.component').then(
        (m) => m.ContactComponent,
      ),
  },
  {
    path: '**',
    redirectTo: 'about-me',
  },
];
