import { TestBed } from '@angular/core/testing';

import { HttpTestingController } from '@angular/common/http/testing';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { GitManagerService } from './git-manager.service';

describe('GitManagerService', () => {
  let service: GitManagerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
    });
    service = TestBed.inject(GitManagerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get commit count from GitHub API', () => {
    const mockCommits = [{ commit: { message: 'Commit message' } }, { commit: { message: 'Another commit message' } }];
    const expectedCommitCount = mockCommits.length;

    service.getCommitCount().subscribe(count => {
      expect(count).toBe(expectedCommitCount);
    });

    const req = httpMock.expectOne('https://api.github.com/repos/hm21/alex-frei-cv/commits');
    expect(req.request.method).toBe('GET');
    req.flush(mockCommits);
  });
});