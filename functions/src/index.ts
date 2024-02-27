import { onRequest } from 'firebase-functions/v2/https';

export const quiz = onRequest(
  {
    cors: ['alex-frei.web.app'],
    timeoutSeconds: 60,
    memory: '128MiB',
    minInstances: 0,
    maxInstances: 3,
    region: 'europe-west1',
    enforceAppCheck: false,
    concurrency: 5,
  },
  async (req, res) => {
    await (await import('./games/quiz')).default(req, res);
  },
);
