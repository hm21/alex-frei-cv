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
import { provideEndpoints } from 'src/app/core/providers/endpoints/endpoints.provider';
import { providePlatformDetection } from 'src/app/core/providers/platform.provider';
import { provideLogger } from 'src/app/core/services/logger/logger-configs.provider';
import { provideModalTesting } from 'src/app/ui/modal/utils/modal-test.provider';
import { provideToastTesting } from 'src/app/ui/toast/providers/toast-test.provider';
import { provideTooltipTesting } from 'src/app/ui/tooltip/providers/tooltip-test.provider';
import '../app/extensions/extensions.loader';

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
