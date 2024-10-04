import {
  Provider
} from '@angular/core';
import { MockModalViewContainerRef } from 'src/test/mocks/view-container/modal-view-container.mock';
import { ModalService } from '../modal.service';
import { MODAL_VIEW_CONTAINER_REF } from './modal.provider';


export function provideModalTesting(): Provider {
  return [
    {
      provide: MODAL_VIEW_CONTAINER_REF,
      useClass:MockModalViewContainerRef
    },
    ModalService,
  ];
}
