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
import { NgxScrollAnimationsDirective, provideNgxScrollAnimations } from 'ngx-scroll-animations';
import { routes } from 'src/app/app.routes';
import { IS_BROWSER } from 'src/app/utils/global-tokens';
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
    {
      provide: IS_BROWSER,
      useValue: true,
    },
    quicklinkProviders,
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
