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
        style({ opacity: '*', transform: '*', transformOrigin: 'top center' }),
      ),
    ],
    { params: { duration: '300ms' } },
  ),
  transition(
    '* => ResumePage',
    [
      style({ opacity: 0 }),
      animate('{{duration}} ease', style({ opacity: '*' })),
    ],
    { params: { duration: '200ms' } },
  ),
  transition(
    '* <=> *',
    [
      style({ opacity: 0, transform: 'translateY(20px)' }),
      animate('{{duration}} ease', style({ opacity: '*', transform: '*' })),
    ],
    { params: { duration: '300ms' } },
  ),
]);
