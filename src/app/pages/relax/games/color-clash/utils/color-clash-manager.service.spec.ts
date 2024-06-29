import { TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ColorClashManagerService } from './color-clash-manager.service';

describe('ColorClashManagerService', () => {
  let service: ColorClashManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      providers: [ColorClashManagerService],
      teardown: { destroyAfterEach: false },
    });
    service = TestBed.inject(ColorClashManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
