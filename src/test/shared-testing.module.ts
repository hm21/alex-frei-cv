import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  NgModule,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router';
import { provideNgxCountAnimations } from 'ngx-count-animation';
import {
  quicklinkProviders,
  QuicklinkStrategy
} from 'ngx-quicklink';
import { provideNgxScrollAnimations } from 'ngx-scroll-animations';
import { routes } from 'src/app/app.routes';
import { provideLogger } from 'src/app/services/logger/logger-configs.provider';
import { provideModalTesting } from 'src/app/shared/modal/utils/modal-test.provider';
import { provideToastTesting } from 'src/app/shared/toast/utils/toast-test.provider';
import { provideTooltipTesting } from 'src/app/shared/tooltip/utils/tooltip-test.provider';
import { provideEndpoints } from 'src/app/utils/providers/endpoints/endpoints.provider';
import { providePlatformDetection } from 'src/app/utils/providers/is-browser.provider';
import '../app/utils/extensions/extensions';

@NgModule({
  providers: [
    quicklinkProviders,
    provideRouter(
      routes,
      withPreloading(QuicklinkStrategy),
      withEnabledBlockingInitialNavigation(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
    ),
    provideAnimations(),
    provideHttpClient(),
    provideHttpClientTesting(),
    provideExperimentalZonelessChangeDetection(),

    provideLogger(),
    provideEndpoints(),
    provideModalTesting(),
    provideToastTesting(),
    provideTooltipTesting(),
    providePlatformDetection(),

    provideNgxScrollAnimations(),
    provideNgxCountAnimations(),
  ],
})
export class SharedTestingModule {}
