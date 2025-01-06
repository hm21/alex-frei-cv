import { TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { IdManagerService } from './id-manager.service';

describe('IdManagerService', () => {
  let service: IdManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      teardown: { destroyAfterEach: false },
    });
    service = TestBed.inject(IdManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
