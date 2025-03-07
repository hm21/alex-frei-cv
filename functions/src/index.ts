import { onRequest } from 'firebase-functions/v2/https';

import './core/extensions/extensions';

export const quiz = onRequest(
  {
    cors: ['alex-frei.web.app'],
    timeoutSeconds: 60,
    memory: '128MiB',
    minInstances: 0,
    maxInstances: 3,
    region: 'europe-west6',
    concurrency: 5,
  },
  async (req, res) => {
    await (await import('./features/games/quiz')).default(req, res);
  },
);
export const gitCommits = onRequest(
  {
    cors: ['alex-frei.web.app'],
    timeoutSeconds: 20,
    memory: '128MiB',
    minInstances: 0,
    maxInstances: 5,
    region: 'europe-west6',
    concurrency: 50,
  },
  async (req, res) => {
    await (await import('./features/git/git-commits')).default(req, res);
  },
);
export const gitRepoStats = onRequest(
  {
    cors: ['alex-frei.web.app'],
    timeoutSeconds: 20,
    memory: '128MiB',
    minInstances: 0,
    maxInstances: 5,
    region: 'europe-west6',
    concurrency: 50,
  },
  async (req, res) => {
    await (await import('./features/git/git-repo-stats')).default(req, res);
  },
);
export const contactForm = onRequest(
  {
    cors: ['alex-frei.web.app'],
    timeoutSeconds: 60,
    memory: '128MiB',
    minInstances: 0,
    maxInstances: 3,
    region: 'europe-west6',
    concurrency: 5,
  },
  async (req, res) => {
    await (await import('./features/contact-form')).default(req, res);
  },
);
