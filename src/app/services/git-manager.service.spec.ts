import { TestBed } from '@angular/core/testing';

import { HttpTestingController } from '@angular/common/http/testing';
import { environment as debugEnvironment } from 'src/environments/environment';
import { environment } from 'src/environments/environment.prod';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { GitManagerService } from './git-manager.service';

describe('GitManagerService', () => {
  let service: GitManagerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      teardown: {destroyAfterEach: false} 
    });
    service = TestBed.inject(GitManagerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return the commit count from cache if available', () => {
    const mockCommitCount = 10;
    service['gitCommitCount'] = mockCommitCount; // Set mock commit count in service

    service.getCommitCount().subscribe((commitCount) => {
      expect(commitCount).toEqual(mockCommitCount);
    });

    httpMock.expectNone(environment.endpoints.gitCommitCount);
  });

  it('should make an HTTP request to get the commit count if not available in cache', () => {
    service['gitCommitCount'] = 0; // Set mock commit count in service
    debugEnvironment.endpoints.gitCommitCount =
      environment.endpoints.gitCommitCount;
    service.getCommitCount().subscribe((count) => {
      expect(count).toBeGreaterThan(0);
    });
    const req = httpMock.expectOne(environment.endpoints.gitCommitCount);
    expect(req.request.method).toBe('GET');
  });
});
