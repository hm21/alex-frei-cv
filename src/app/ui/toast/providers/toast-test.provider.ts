import {
  Provider
} from '@angular/core';
import { MockToastViewContainerRef } from 'src/test/mocks/view-container/toast-view-container.mock';
import { ToastService } from '../services/toast.service';
import { TOAST_VIEW_CONTAINER_REF } from './toast.provider';

export function provideToastTesting(): Provider {
  return [
    {
      provide: TOAST_VIEW_CONTAINER_REF,
      useClass: MockToastViewContainerRef,
    },
    ToastService,
  ];
}
