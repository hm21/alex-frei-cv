import {
    inject,
    InjectionToken,
    Provider,
    ViewContainerRef,
} from '@angular/core';
import { ModalService } from '../modal.service';

export const MODAL_VIEW_CONTAINER_REF = new InjectionToken<ViewContainerRef>(
  'ModalViewContainerRef',
);

export function provideModal(): Provider {
  return [
    {
      provide: MODAL_VIEW_CONTAINER_REF,
      useFactory: () => inject(ViewContainerRef),
    },
    ModalService,
  ];
}
