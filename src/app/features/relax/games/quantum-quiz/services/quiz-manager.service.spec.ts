import { TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { QuizManagerService } from './quiz-manager.service';

describe('QuizManagerService', () => {
  let service: QuizManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      providers: [QuizManagerService],
      teardown: { destroyAfterEach: false },
    });
    service = TestBed.inject(QuizManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
