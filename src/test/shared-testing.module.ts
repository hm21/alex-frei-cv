import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  NgModule,
  provideExperimentalZonelessChangeDetection,
  ViewContainerRef,
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
  quicklinkProviders,
  QuicklinkStrategy,
} from 'ngx-quicklink';
import {
  NgxScrollAnimationsDirective,
  provideNgxScrollAnimations,
} from 'ngx-scroll-animations';
import { routes } from 'src/app/app.routes';
import { provideLogger } from 'src/app/services/logger/logger-configs.provider';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { provideEndpoints } from 'src/app/utils/providers/endpoints/endpoints.provider';
import { providePlatformDetection } from 'src/app/utils/providers/is-browser.provider';
import '../app/utils/extensions/extensions';
import { MockToastViewContainerRef } from './mocks/toast-view-container.mock';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    NgxScrollAnimationsDirective,
    QuicklinkDirective,
  ],
  exports: [HttpClientTestingModule, NgxScrollAnimationsDirective],
  providers: [
    {
      provide: ViewContainerRef,
      useClass: MockToastViewContainerRef,
    },
    ToastService,
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
