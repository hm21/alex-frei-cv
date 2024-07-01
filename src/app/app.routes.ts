import { Routes } from '@angular/router';
import { relaxRoutes } from './pages/relax/relax.routes';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/about-me' },
  {
    path: 'about-me',
    data: { animation: 'AboutMePage' },
    loadComponent: () =>
      import('./pages/about-me/about-me.component').then(
        (m) => m.AboutMeComponent,
      ),
  },
  {
    path: 'resume',
    data: { animation: 'ResumePage' },
    loadComponent: () =>
      import('./pages/resume/resume.component').then((m) => m.ResumeComponent),
  },
  {
    path: 'portfolio',
    data: { animation: 'PortfolioPage' },
    loadComponent: () =>
      import('./pages/portfolio/portfolio.component').then(
        (m) => m.PortfolioComponent,
      ),
  },
  ...relaxRoutes,
  {
    path: 'contact',
    data: { animation: 'ContactPage' },
    loadComponent: () =>
      import('./pages/contact/contact.component').then(
        (m) => m.ContactComponent,
      ),
  },
  {
    path: '**',
    redirectTo: 'about-me',
  },
];
