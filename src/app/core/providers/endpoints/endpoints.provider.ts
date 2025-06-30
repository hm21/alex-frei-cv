import { InjectionToken, Provider, isDevMode } from '@angular/core';
import { Endpoints } from './interfaces/endpoints.interface';

export const ENDPOINTS = new InjectionToken<Endpoints>('endpoints');

export const devEndpoints: Endpoints = {
  quiz: 'http://127.0.0.1:5001/alex-frei/europe-west6/generateQuiz',
  contactMessage: 'http://127.0.0.1:5001/alex-frei/europe-west6/submitContactForm',
  gitCommitCount: 'http://127.0.0.1:5001/alex-frei/europe-west6/getGitCommitCount',
  gitRepoStats: 'http://127.0.0.1:5001/alex-frei/europe-west6/getGitRepoStats',
};

export const productionEndpoints: Endpoints = {
  quiz: 'https://alex-frei.web.app/api/v1/quiz',
  contactMessage: 'https://alex-frei.web.app/api/v1/contact-form',
  gitCommitCount: 'https://alex-frei.web.app/api/v1/git-commit-count',
  gitRepoStats: 'https://alex-frei.web.app/api/v1/git-repo-stats',
};

export function provideEndpoints(): Provider {
  return [
    {
      provide: ENDPOINTS,
      useValue: isDevMode() ? devEndpoints : productionEndpoints,
    },
  ];
}
