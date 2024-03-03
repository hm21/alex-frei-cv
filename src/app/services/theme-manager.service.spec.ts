import { TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ThemeManagerService } from './theme-manager.service';

describe('ThemeManagerService', () => {
  let service: ThemeManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
    });
    service = TestBed.inject(ThemeManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
