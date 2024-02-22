import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const modalAnimation = trigger('modal', [
  transition(
    ':enter',
    [
      style({
        transform: 'translateY(100%)',
        borderRadius: '20px 20px 0 0',
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)',
      }),
      animate(
        '{{duration}}ms ease',
        keyframes([
          style({
            offset: 0.7,
            transform: 'translateY(30%)',
            borderRadius: '20px 20px 0 0',
          }),
          style({
            offset: 1,
            transform: '*',
            borderRadius: '*',
          }),
        ]),
      ),
    ],
    { params: { duration: '600' } },
  ),
  transition(
    '* => out',
    [
      animate(
        '{{duration}}ms ease',
        style({
          transform: 'translateY(100%)',
          borderRadius: '20px 20px 0 0',
          boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)',
        }),
      ),
    ],
    { params: { duration: '600' } },
  ),
]);
