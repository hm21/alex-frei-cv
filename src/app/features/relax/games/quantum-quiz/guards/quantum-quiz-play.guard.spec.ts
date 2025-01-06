import { TestBed, inject } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { QuizManagerService } from '../services/quiz-manager.service';
import { quantumQuizPlayGuard } from './quantum-quiz-play.guard';

describe('quantumQuizPlayGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      quantumQuizPlayGuard(...guardParameters),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      providers: [QuizManagerService],
      teardown: { destroyAfterEach: false },
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow activation if there is no error message and questions are being generated', inject(
    [QuizManagerService],
    (gameManager: QuizManagerService) => {
      gameManager.generateErrorMsg.set('');
      gameManager.generatingQuestions = true;

      const result = executeGuard(
        {} as ActivatedRouteSnapshot,
        {} as RouterStateSnapshot,
      );

      expect(result).toBeTrue();
    },
  ));

  it('should prevent activation if there is an error message', inject(
    [QuizManagerService],
    (gameManager: QuizManagerService) => {
      gameManager.generateErrorMsg.set('Some error');
      gameManager.generatingQuestions = true;

      const result = executeGuard(
        {} as ActivatedRouteSnapshot,
        {} as RouterStateSnapshot,
      );

      expect(result).toBeFalse();
    },
  ));

  it('should prevent activation if questions are not being generated', inject(
    [QuizManagerService],
    (gameManager: QuizManagerService) => {
      gameManager.generateErrorMsg.set('');
      gameManager.generatingQuestions = false;

      const result = executeGuard(
        {} as ActivatedRouteSnapshot,
        {} as RouterStateSnapshot,
      );

      expect(result).toBeFalse();
    },
  ));
});
