import { animate, style, transition, trigger } from '@angular/animations';

/**
 * Defines the animation for game route animations
 */
export const gameScreenAnimation = trigger('gameScreenAnimation', [
  transition(
    '* <=> *',
    [
      style({
        opacity: 0.3,
        transform: 'translateY(25px) scale(0.85)',
      }),
      animate('{{duration}} ease', style({ opacity: 1, transform: '*' })),
    ],
    { params: { duration: '500ms' } },
  ),
]);
