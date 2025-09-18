import { TestBed } from '@angular/core/testing';

import { HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { ENDPOINTS } from 'src/app/core/providers/endpoints/endpoints.provider';
import { IS_BROWSER } from 'src/app/core/providers/platform.provider';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { QuizManagerService } from './quiz-manager.service';

describe('QuizManagerService', () => {
  describe('Browser', () => {
    let httpMock: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SharedTestingModule],
        providers: [
          QuizManagerService,
          LoggerService,
          { provide: ENDPOINTS, useValue: { quiz: '/api/quiz' } },
          { provide: IS_BROWSER, useValue: true },
        ],
        teardown: { destroyAfterEach: false },
      });
      httpMock = TestBed.inject(HttpTestingController);
      TestBed.inject(QuizManagerService);
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('should wake up quiz function on initialization', () => {
      const req = httpMock.expectOne('/api/quiz');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe('wake-up');
      req.flush({});
    });
  });

  describe('Server', () => {
    let service: QuizManagerService;
    let httpMock: HttpTestingController;
    let router: Router;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SharedTestingModule],
        providers: [
          QuizManagerService,
          LoggerService,
          { provide: ENDPOINTS, useValue: { quiz: '/api/quiz' } },
          { provide: IS_BROWSER, useValue: false },
        ],
        teardown: { destroyAfterEach: false },
      });
      router = TestBed.inject(Router);
      service = TestBed.inject(QuizManagerService);
      httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should end the game and set won cash', () => {
      service.level.set(15);
      service.state.set('correct');
      service.gameEnd();
      expect(service.wonCash()).toBe(1_000_000);
      expect(service.generateErrorMsg()).toBe('');
    });

    it('should determine if the game is won', () => {
      service.level.set(15);
      service.state.set('correct');
      expect(service.isGameWon).toBeTrue();
      service.state.set('wrong');
      expect(service.isGameWon).toBeFalse();
    });

    it('should determine if the game is loose', () => {
      service.level.set(3);
      service.state.set('wrong');
      expect(service.isGameWon).toBeFalse();
      service.gameEnd();
    });

    it('should navigate to /relax/quantum-quiz with "loose" outlet if game is lost', async () => {
      spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

      service.state.set('wrong');
      service.gameEnd();

      expect(router.navigate).toHaveBeenCalledWith(
        [
          '/relax',
          'quantum-quiz',
          {
            outlets: {
              state: 'loose', // Check the outlet state
            },
          },
        ],
        {
          replaceUrl: true, // Check the replaceUrl flag
        },
      );
    });

    it('should navigate with "won" outlet if game is won', async () => {
      spyOn(router, 'navigate').and.returnValue(Promise.resolve(true)); // Mock router navigation

      service.state.set('correct');
      service.level.set(14);
      service.gameEnd();

      expect(router.navigate).toHaveBeenCalledWith(
        [
          '/relax',
          'quantum-quiz',
          {
            outlets: {
              state: 'won', // Check the outlet state for "won"
            },
          },
        ],
        {
          replaceUrl: true,
        },
      );
    });
  });
});
