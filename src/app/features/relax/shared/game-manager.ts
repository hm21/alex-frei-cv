import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, filter, fromEvent, takeUntil } from 'rxjs';
import { IS_BROWSER } from 'src/app/core/providers/platform.provider';

export abstract class GameManager {
  protected isBrowser = inject(IS_BROWSER);
  protected document = inject(DOCUMENT);
  protected router = inject(Router);

  protected destroy$ = new Subject<void>();

  constructor() {
    this.initKeyListener();
  }

  public destroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Initializes the key listener for the Escape key.
   * When the Escape key is pressed, the user is navigated to the 'relax' page.
   */
  private initKeyListener() {
    fromEvent<KeyboardEvent>(this.document, 'keydown')
      .pipe(
        filter((event) => event.key === 'Escape'),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.router.navigate(['relax']);
      });
  }
}
