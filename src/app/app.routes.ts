import { Routes } from '@angular/router';

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
  {
    path: 'relax',
    children: [
      {
        path: '',
        data: { animation: 'RelaxPage' },
        loadComponent: () =>
          import('./pages/relax/relax.component').then((m) => m.RelaxComponent),
      },
      {
        path: 'quantum-quiz',
        data: { animation: 'QuantumQuizPage' },
        loadComponent: () =>
          import(
            './pages/relax/games/quantum-quiz/quantum-quiz.component'
          ).then((m) => m.QuantumQuizComponent),
      },
      {
        path: 'color-clash',
        data: { animation: 'ColorClashPage' },
        loadComponent: () =>
          import('./pages/relax/games/color-clash/color-clash.component').then(
            (m) => m.ColorClashComponent,
          ),
      },
    ],
  },
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
