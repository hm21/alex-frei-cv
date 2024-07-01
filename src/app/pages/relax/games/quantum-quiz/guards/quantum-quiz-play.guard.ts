import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { QuizManagerService } from '../utils/quiz-manager.service';

/**
 * Guard to check if the quantum quiz game can be played.
 * If there is an error message generated or questions are not being generated,
 * the user is redirected to the 'relax/quantum-quiz' route with a 'choose-topic' outlet.
 *
 * @param {ActivatedRouteSnapshot} route - The activated route snapshot.
 * @param {RouterStateSnapshot} state - The router state snapshot.
 * @returns {boolean} - Returns true if there is no error message and questions are being generated, otherwise false.
 */
export const quantumQuizPlayGuard: CanActivateFn = (route, state) => {
  const gameManager = inject(QuizManagerService);

  if (gameManager.generateErrorMsg() || !gameManager.generatingQuestions) {
    const router = inject(Router);
    router.navigate([
      '/relax',
      'quantum-quiz',
      { outlets: { state: 'choose-topic' } },
    ]);
  }

  return !gameManager.generateErrorMsg() && gameManager.generatingQuestions;
};
