import { animate, style, transition, trigger } from '@angular/animations';

/**
 * Defines the animation for route animations
 */
export const routeAnimation = trigger('routeAnimation', [
  transition(
    'RelaxPage <=> QuantumQuizPage, RelaxPage <=> ColorClashPage',
    [
      style({
        opacity: 0.3,
        transformOrigin: 'top center',
        transform: 'translateY(-20px)',
      }),
      animate(
        '{{duration}} ease',
        style({ opacity: 1, transform: '*', transformOrigin: 'top center' }),
      ),
    ],
    { params: { duration: '300ms' } },
  ),
  transition(
    '* <=> *',
    [
      style({ opacity: 0, transform: 'translateX(-50px)' }),
      animate(
        '{{duration}} ease',
        style({ opacity: 1, transform: 'translateX(0px)' }),
      ),
    ],
    { params: { duration: '300ms' } },
  ),
]);
