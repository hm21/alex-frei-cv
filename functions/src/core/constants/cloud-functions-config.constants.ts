import { HttpsOptions } from 'firebase-functions/https';

export const DEFAULT_API_CORS_ORIGINS: string | RegExp | (string | RegExp)[] = [
  'alex-frei.web.app',
];
export const DEPLOYMENT_REGION: string | string[] = 'europe-west6';

export const API_FUNCTION_CONFIG: Partial<HttpsOptions> = {
  cors: DEFAULT_API_CORS_ORIGINS,
  timeoutSeconds: 20,
  memory: '128MiB',
  minInstances: 0,
  maxInstances: 5,
  region: DEPLOYMENT_REGION,
  concurrency: 50,
};

export const LONG_RUNNING_FUNCTION_CONFIG: Partial<HttpsOptions> = {
  ...API_FUNCTION_CONFIG,
  timeoutSeconds: 60,
  concurrency: 5,
  maxInstances: 3,
};
