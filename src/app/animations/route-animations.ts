import { animate, style, transition, trigger } from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition(
    '* <=> *',
    [
      style({ opacity: 0, transform: 'translateX(-50px)' }),
      animate('{{duration}} ease', style({ opacity: 1, transform: 'translateX(0px)' })),
    ],
    { params: { duration: '300ms' } },
  ),
]);
