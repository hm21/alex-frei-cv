import { animate, keyframes, style, transition, trigger } from "@angular/animations";

/**
 * Defines the animation for the color clash items.
 */
export const colorClashItemAnimation = trigger('viewItem', [
  transition(
    ':leave',
    [
      style({
        opacity: 1,
        transform: '*',
      }),
      animate(
        '{{duration}} ease',
        keyframes([
          style({
            offset: 0.7,
            opacity: 0.5,
            transform: 'translate(-50%, 50px)',
            background: '{{color}}',
          }),
          style({
            offset: 1,
            opacity: 0,
            transform: 'translate(-50%, 70px)',
          }),
        ]),
      ),
    ],
    { params: { duration: '500ms', color: 'red' } },
  ),
]);
