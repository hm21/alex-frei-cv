import { HttpsOptions, onRequest } from 'firebase-functions/v2/https';

import {
  API_FUNCTION_CONFIG,
  LONG_RUNNING_FUNCTION_CONFIG,
} from './core/constants/cloud-functions-config.constants';
import './core/extensions/extensions';

function createHttpFunction(path: string, config: Partial<HttpsOptions> = {}) {
  return onRequest(
    {
      ...API_FUNCTION_CONFIG,
      ...config,
    },
    async (req, res) => {
      const handler = (await import(path)).default;
      await handler(req, res);
    },
  );
}

export const getGitCommitCount = createHttpFunction(
  './features/git/git-commit-count.function',
);

export const getGitRepoStats = createHttpFunction(
  './features/git/git-repo-stats.function',
);

export const generateQuiz = createHttpFunction(
  './features/games/generate-quiz.function',
  LONG_RUNNING_FUNCTION_CONFIG,
);

export const submitContactForm = createHttpFunction(
  './features/contact-form/submit-contact-form.function',
  LONG_RUNNING_FUNCTION_CONFIG,
);
