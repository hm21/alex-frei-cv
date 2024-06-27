import {
  ApplicationConfig,
  isDevMode,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  provideClientHydration,
  withI18nSupport,
} from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideServiceWorker } from '@angular/service-worker';
import { provideNgxCountAnimations } from 'ngx-count-animation';
import { QuicklinkStrategy } from 'ngx-quicklink';
import { provideNgxScrollAnimations } from 'ngx-scroll-animations';
import { environment } from 'src/environments/environment';
import '../app/utils/extensions/extensions';
import { routes } from './app.routes';
import { IS_BROWSER } from './utils/global-tokens';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(
      routes,
      withPreloading(QuicklinkStrategy),
      withEnabledBlockingInitialNavigation(),
      withInMemoryScrolling({
        scrollPositionRestoration: environment.production
          ? 'enabled'
          : 'disabled',
        anchorScrolling: 'enabled',
      }),
    ),
    provideClientHydration(withI18nSupport()),
    provideHttpClient(withFetch()),
    provideAnimations(),
    provideNgxScrollAnimations({
      animationName: 'fade-in-up',
      once: false,
    }),
    provideNgxCountAnimations(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:3000',
    }),
    {
      provide: IS_BROWSER,
      useValue: true,
    },
  ],
};
