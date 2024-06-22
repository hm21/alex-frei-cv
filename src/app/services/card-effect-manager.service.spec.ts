import { TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { CardEffectManagerService } from './card-effect-manager.service';

describe('CardEffectManagerService', () => {
  let service: CardEffectManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      teardown: { destroyAfterEach: false },
      imports: [SharedTestingModule],
    });
    service = TestBed.inject(CardEffectManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
