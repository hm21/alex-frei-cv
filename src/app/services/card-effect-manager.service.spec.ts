import { TestBed } from '@angular/core/testing';

import { CardEffectManagerService } from './card-effect-manager.service';

describe('CardEffectManagerService', () => {
  let service: CardEffectManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardEffectManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
