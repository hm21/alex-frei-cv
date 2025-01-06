import { TestBed, inject } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { SafePipe } from './safe.pipe';

describe('SafePipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      teardown: { destroyAfterEach: false },
      imports: [SharedTestingModule],
    });
  });

  it('create an instance', inject([DomSanitizer], () => {
    TestBed.runInInjectionContext(() => {
      const pipe = new SafePipe();
      expect(pipe).toBeTruthy();
    });
  }));
});
