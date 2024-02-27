import { animate, style, transition, trigger } from '@angular/animations';

export const cardFadeInUpScale = trigger('cardFadeInUpScale', [
  transition(
    ':enter',
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
