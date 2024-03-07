import { Environment } from './environment-interface';

export const environment: Environment = {
  production: true,
  analytics: true,
  endpoints: {
    quiz: 'https://alex-frei.web.app/api/v1/quiz',
    contactMessage: 'https://alex-frei.web.app/api/v1/contact-form',
    gitCommitCount: 'https://alex-frei.web.app/api/v1/git-commit-count',
  },
};
