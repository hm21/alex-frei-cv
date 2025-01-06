import { TestBed, inject } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { QuizManagerService } from '../services/quiz-manager.service';
import { quantumQuizWonGuard } from './quantum-quiz-won.guard';

describe('quantumQuizWonGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    quantumQuizWonGuard(...guardParameters);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      teardown: { destroyAfterEach: false },
      providers: [QuizManagerService],
    });
  });

  it('should be created', () => {
    TestBed.runInInjectionContext(() => {
      expect(executeGuard).toBeTruthy();
    });
  });

  it('should allow activation if the game is won', inject(
    [QuizManagerService],
    (gameManager: QuizManagerService) => {
      TestBed.runInInjectionContext(() => {
        Object.defineProperty(gameManager, 'isGameWon', {
          get: () => true,
        });

        const result = executeGuard(
          {} as ActivatedRouteSnapshot,
          {} as RouterStateSnapshot,
        );

        expect(result).toBeTrue();
      });
    },
  ));

  it('should prevent activation and redirect if the game is not won', inject(
    [QuizManagerService, Router],
    (gameManager: QuizManagerService) => {
      TestBed.runInInjectionContext(() => {
        Object.defineProperty(gameManager, 'isGameWon', {
          get: () => false,
        });

        const result = executeGuard(
          {} as ActivatedRouteSnapshot,
          {} as RouterStateSnapshot,
        );

        expect(result).toBeFalse();
      });
    },
  ));
});
