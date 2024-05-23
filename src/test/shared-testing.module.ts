import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router';
import {
  QuicklinkDirective,
  QuicklinkStrategy,
  quicklinkProviders,
} from 'ngx-quicklink';
import { NgxScrollAnimationsModule } from 'ngx-scroll-animations';
import { routes } from 'src/app/app.routes';
import { IS_BROWSER } from 'src/app/utils/global-tokens';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientTestingModule,
    NgxScrollAnimationsModule,
    QuicklinkDirective,
  ],
  exports: [HttpClientTestingModule, NgxScrollAnimationsModule],
  providers: [
    {
      provide: IS_BROWSER,
      useValue: true,
    },
    quicklinkProviders,
    provideExperimentalZonelessChangeDetection(),
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
