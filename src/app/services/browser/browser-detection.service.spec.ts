import { TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { BrowserDetectionService } from './browser-detection.service';

describe('BrowserDetectionService', () => {
  let service: BrowserDetectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
    });
    service = TestBed.inject(BrowserDetectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
