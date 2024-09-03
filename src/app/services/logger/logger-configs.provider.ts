import { isPlatformBrowser } from '@angular/common';
import {
  InjectionToken,
  PLATFORM_ID,
  Provider,
  isDevMode,
} from '@angular/core';
import { LoggerConfigs } from './logger-configs.interface';

export const LOGGER_CONFIGS = new InjectionToken<LoggerConfigs>(
  'loggerConfigs',
);

const browserConfigs: LoggerConfigs = {
  invalidCallAction: isDevMode() ? 'throw' : 'ignore',
  allowedLevels: {
    log: isDevMode(),
    info: isDevMode(),
    warn: isDevMode(),
    error: isDevMode(),
    user: !isDevMode(),
    server: false,
  },
};
const serverConfigs: LoggerConfigs = {
  invalidCallAction: 'ignore',
  allowedLevels: {
    log: false,
    info: false,
    warn: false,
    error: false,
    user: false,
    server: true,
  },
};

export function provideLogger(): Provider {
  return [
    {
      provide: LOGGER_CONFIGS,
      useFactory: (platformId: object) =>
        isPlatformBrowser(platformId) ? browserConfigs : serverConfigs,
      deps: [PLATFORM_ID],
    },
  ];
}
