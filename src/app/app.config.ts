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

import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  provideClientHydration,
  withEventReplay,
  withIncrementalHydration
} from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideServiceWorker } from '@angular/service-worker';
import { provideNgxCountAnimations } from 'ngx-count-animation';
import { QuicklinkStrategy, quicklinkProviders } from 'ngx-quicklink';
import { provideNgxScrollAnimations } from 'ngx-scroll-animations';
import '../app/utils/extensions/extensions';
import { routes } from './app.routes';
import { provideLogger } from './services/logger/logger-configs.provider';
import { globalHttpErrorHandlerInterceptor } from './utils/interceptor/global-http-error-handler.interceptor';
import { provideEndpoints } from './utils/providers/endpoints/endpoints.provider';
import { providePlatformDetection } from './utils/providers/platform.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideLogger(),
    provideEndpoints(),
    providePlatformDetection(),
    provideNgxScrollAnimations({ once: false }),
    provideNgxCountAnimations(),

    provideAnimations(),
    provideHttpClient(
      withFetch(),
      withInterceptors([globalHttpErrorHandlerInterceptor]),
    ),
    provideExperimentalZonelessChangeDetection(),
    provideClientHydration(withEventReplay(), withIncrementalHydration()),

    // Routing
    quicklinkProviders,
    provideRouter(
      routes,
      withPreloading(QuicklinkStrategy),
      withEnabledBlockingInitialNavigation(),
      withInMemoryScrolling({
        scrollPositionRestoration: isDevMode() ? 'disabled' : 'enabled',
        anchorScrolling: 'enabled',
      }),
    ),

    // PWA
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:3000',
    }),
  ],
};
