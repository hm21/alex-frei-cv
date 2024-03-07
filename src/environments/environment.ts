import { Environment } from './environment-interface';

export const environment: Environment = {
  production: false,
  analytics: false,
  endpoints: {
    quiz: 'http://127.0.0.1:5001/alex-frei/europe-west6/quiz',
    contactMessage: 'http://127.0.0.1:5001/alex-frei/europe-west6/contactForm',
  },
};
