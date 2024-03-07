import { onRequest } from 'firebase-functions/v2/https';

export const quiz = onRequest(
  {
    cors: ['alex-frei.web.app'],
    timeoutSeconds: 60,
    memory: '128MiB',
    minInstances: 0,
    maxInstances: 3,
    region: 'europe-west6',
    enforceAppCheck: false,
    concurrency: 5,
  },
  async (req, res) => {
    await (await import('./games/quiz')).default(req, res);
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
    enforceAppCheck: false,
    concurrency: 50,
  },
  async (req, res) => {
    await (await import('./git-commits')).default(req, res);
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
    enforceAppCheck: false,
    concurrency: 5,
  },
  async (req, res) => {
    await (await import('./contact-form')).default(req, res);
  },
);
