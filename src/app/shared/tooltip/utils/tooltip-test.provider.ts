import {
  Provider
} from '@angular/core';
import { MockTooltipViewContainerRef } from 'src/test/mocks/view-container/tooltip-view-container.mock';
import { TooltipService } from '../tooltip.service';
import { TOOLTIP_VIEW_CONTAINER_REF } from './tooltip.provider';

export function provideTooltipTesting(): Provider {
  return [
    {
      provide: TOOLTIP_VIEW_CONTAINER_REF,
      useClass: MockTooltipViewContainerRef,
    },
    TooltipService,
  ];
}
