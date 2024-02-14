import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { IS_BROWSER } from './utils/global-tokens';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideNoopAnimations(),
    {
      provide: IS_BROWSER,
      useValue: false,
    },
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);

