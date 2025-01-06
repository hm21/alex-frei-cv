import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ScreenService } from './screen.service';

// Helper function to trigger window resize event
function triggerResize(width: number, height: number) {
  (window as any).innerWidth = width;
  (window as any).innerHeight = height;
  window.dispatchEvent(new Event('resize'));
}

describe('ScreenService', () => {
  let service: ScreenService;
  let documentMock: Document;

  beforeEach(() => {
    documentMock = document;

    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      providers: [ScreenService, { provide: DOCUMENT, useValue: documentMock }],
      teardown: { destroyAfterEach: false },
    });

    service = TestBed.inject(ScreenService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should detect extra small (xs) screen size', () => {
    triggerResize(500, 800);
    expect(service.xs).toBeTrue();
    expect(service.sm).toBeFalse();
    expect(service.md).toBeFalse();
    expect(service.lg).toBeFalse();
    expect(service.xl).toBeFalse();
  });

  it('should detect small (sm) screen size', () => {
    triggerResize(600, 800);
    expect(service.sm).toBeTrue();
  });

  it('should detect medium (md) screen size', () => {
    triggerResize(800, 800);
    expect(service.md).toBeTrue();
  });

  it('should detect large (lg) screen size', () => {
    triggerResize(1000, 800);
    expect(service.lg).toBeTrue();
  });

  it('should detect extra large (xl) screen size', () => {
    triggerResize(1400, 800);
    expect(service.xl).toBeTrue();
  });

  it('should update width and height on resize event', () => {
    triggerResize(1200, 900);
    expect(service.width).toBe(1200);
    expect(service.height).toBe(900);
  });

  it('should share resize$ observable values', (done) => {
    service.resize$.pipe(take(1)).subscribe((event) => {
      expect(event).toBeInstanceOf(Event);
      done();
    });
    window.dispatchEvent(new Event('resize'));
  });

  it('should share scroll$ observable values', (done) => {
    service.scroll$.subscribe((event) => {
      expect(event).toBeInstanceOf(Event);
      done();
    });
    document.dispatchEvent(new Event('scroll'));
  });
});
