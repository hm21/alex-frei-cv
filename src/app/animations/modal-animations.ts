import {
  animate,
  keyframes,
  state,
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
        '{{durationIn}}ms ease',
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
    { params: { durationIn: '600' } },
  ),
  transition(
    '* => out',
    [
      animate(
        '{{durationOut}}ms ease',
        style({
          transform: 'translateY(100%)',
          borderRadius: '20px 20px 0 0',
          boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)',
        }),
      ),
    ],
    { params: { durationOut: '600' } },
  ),
  state(
    'out',
    style({
      transform: 'translateY(100%)',
    }),
  ),
]);
