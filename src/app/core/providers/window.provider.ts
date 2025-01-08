import { InjectionToken, Provider } from '@angular/core';
import { IS_BROWSER } from './platform.provider';

export const WINDOW = new InjectionToken<Window>('window-token', {
  factory: () => window,
});

export function provideWindow(): Provider[] {
  return [
    {
      provide: WINDOW,
      useFactory: (isBrowser: boolean) => (isBrowser ? window : null),
      deps: [IS_BROWSER],
    },
  ];
}
