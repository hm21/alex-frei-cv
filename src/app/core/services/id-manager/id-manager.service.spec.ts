import { TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { IS_BROWSER } from '../../providers/platform.provider';
import { IdManagerService } from './id-manager.service';

describe('IdManagerService browser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      providers: [{ provide: IS_BROWSER, useValue: true }],
      teardown: { destroyAfterEach: false },
    });
  });

  it('should be created', () => {
    const service = TestBed.inject(IdManagerService);
    expect(service).toBeTruthy();
  });

  it('should generate a unique sessionId', () => {
    const service = TestBed.inject(IdManagerService);
    const sessionId = service.sessionId;
    expect(sessionId).toBeTruthy();
    expect(sessionId.length).toBeGreaterThan(0);
  });

  it('should generate a unique ID with generateUniqueId method', () => {
    const service = TestBed.inject(IdManagerService);
    const uniqueId = service.generateUniqueId();
    expect(uniqueId).toBeTruthy();
    expect(uniqueId.length).toBeGreaterThan(0);
  });

  it('should load userId from local storage', () => {
    const id = 'testId';
    localStorage.setItem('userId', id);
    const service = TestBed.inject(IdManagerService);

    expect(service.userId).toBe(id);
  });
  it('should create new userId if it does not exist in local storage', () => {
    localStorage.removeItem('userId');
    const service = TestBed.inject(IdManagerService);

    const userId = service.userId;
    expect(userId).toBeTruthy();
    expect(userId.length).toBeGreaterThan(0);
  });
});

describe('IdManagerService server', () => {
  let service: IdManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      providers: [{ provide: IS_BROWSER, useValue: false }],
      teardown: { destroyAfterEach: false },
    });
    service = TestBed.inject(IdManagerService);
  });

  it('should set userId to "SERVER" for non-browser environment', () => {
    service['isBrowser'] = false;
    expect(service.userId).toBe('SERVER');
  });
});
