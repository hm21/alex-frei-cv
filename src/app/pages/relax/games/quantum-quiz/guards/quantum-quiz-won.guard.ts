import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { QuizManagerService } from '../utils/quiz-manager.service';

/**
 * Guard to check if the quantum quiz game is won.
 * If the game is not won, the user is redirected to the 'relax/quantum-quiz' route with a 'hacker' outlet.
 *
 * @param {ActivatedRouteSnapshot} route - The activated route snapshot.
 * @param {RouterStateSnapshot} state - The router state snapshot.
 * @returns {boolean} - Returns true if the game is won, otherwise false.
 */
export const quantumQuizWonGuard: CanActivateFn = (route, state) => {
  const gameManager = inject(QuizManagerService);

  if (!gameManager.isGameWon) {
    const router = inject(Router);
    router.navigate([
      '/relax',
      'quantum-quiz',
      { outlets: { state: 'hacker' } },
    ]);
  }

  return gameManager.isGameWon;
};
