import {
  inject,
  InjectionToken,
  Provider,
  ViewContainerRef,
} from '@angular/core';
import { ToastService } from '../toast.service';

export const TOAST_VIEW_CONTAINER_REF = new InjectionToken<ViewContainerRef>(
  'ToastViewContainerRef',
);

export function provideToast(): Provider {
  return [
    {
      provide: TOAST_VIEW_CONTAINER_REF,
      useFactory: () => inject(ViewContainerRef),
    },
    ToastService,
  ];
}
