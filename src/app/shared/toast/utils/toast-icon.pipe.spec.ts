import { TestBed } from '@angular/core/testing';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ToastIconPipe } from './toast-icon.pipe';

describe('ToastIconPipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      teardown: { destroyAfterEach: false },
      imports: [SharedTestingModule],
    });
  });

  it('create an instance', () => {
    TestBed.runInInjectionContext(() => {
      const pipe = new ToastIconPipe();
      expect(pipe).toBeTruthy();
    });
  });
});
