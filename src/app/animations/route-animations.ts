import { animate, style, transition, trigger } from '@angular/animations';

/**
 * Defines the animation for route animations
 */
export const routeAnimation = trigger('routeAnimation', [
  transition(
    '* <=> *',
    [
      style({ opacity: 0, transform: 'translateX(-50px)' }),
      animate('{{duration}} ease', style({ opacity: 1, transform: 'translateX(0px)' })),
    ],
    { params: { duration: '300ms' } },
  ),
]);
