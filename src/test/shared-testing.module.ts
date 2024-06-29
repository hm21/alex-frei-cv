import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  NgModule,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router';
import { provideNgxCountAnimations } from 'ngx-count-animation';
import {
  QuicklinkDirective,
  QuicklinkStrategy,
  quicklinkProviders,
} from 'ngx-quicklink';
import {
  NgxScrollAnimationsDirective,
  provideNgxScrollAnimations,
} from 'ngx-scroll-animations';
import { routes } from 'src/app/app.routes';
import { provideLogger } from 'src/app/services/logger/logger-configs.provider';
import { provideEndpoints } from 'src/app/utils/endpoints/endpoints.provider';
import { providePlatformDetection } from 'src/app/utils/is-browser.provider';
import '../app/utils/extensions/extensions';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientTestingModule,
    NgxScrollAnimationsDirective,
    QuicklinkDirective,
  ],
  exports: [HttpClientTestingModule, NgxScrollAnimationsDirective],
  providers: [
    quicklinkProviders,
    provideEndpoints(),
    provideLogger(),
    providePlatformDetection(),
    provideExperimentalZonelessChangeDetection(),
    provideNgxScrollAnimations(),
    provideNgxCountAnimations(),
    provideRouter(
      routes,
      withPreloading(QuicklinkStrategy),
      withEnabledBlockingInitialNavigation(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
    ),
  ],
})
export class SharedTestingModule {}
