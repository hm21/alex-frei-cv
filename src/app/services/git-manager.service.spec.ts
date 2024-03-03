import { TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { GitManagerService } from './git-manager.service';

describe('GitManagerService', () => {
  let service: GitManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
    });
    service = TestBed.inject(GitManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
