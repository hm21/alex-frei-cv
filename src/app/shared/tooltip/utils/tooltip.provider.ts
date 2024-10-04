import {
  inject,
  InjectionToken,
  Provider,
  ViewContainerRef,
} from '@angular/core';
import { TooltipService } from '../tooltip.service';

export const TOOLTIP_VIEW_CONTAINER_REF = new InjectionToken<ViewContainerRef>(
  'TooltipViewContainerRef',
);

export function provideTooltip(): Provider {
  return [
    {
      provide: TOOLTIP_VIEW_CONTAINER_REF,
      useFactory: () => inject(ViewContainerRef),
    },
    TooltipService,
  ];
}
