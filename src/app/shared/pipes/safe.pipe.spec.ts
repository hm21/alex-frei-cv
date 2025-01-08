import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { SafePipe } from './safe.pipe';

describe('SafePipe', () => {
  let sanitizer: DomSanitizer;
  let pipe: SafePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      teardown: { destroyAfterEach: false },
      imports: [SharedTestingModule],
      providers: [SafePipe],
    });

    sanitizer = TestBed.inject(DomSanitizer);
    pipe = TestBed.inject(SafePipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should bypass security for HTML', () => {
    const value = '<div>Test</div>';
    const result = pipe.transform(value, 'html');
    expect(result).toEqual(sanitizer.bypassSecurityTrustHtml(value));
  });

  it('should bypass security for URL', () => {
    const value = 'http://example.com';
    const result = pipe.transform(value, 'url');
    expect(result).toEqual(sanitizer.bypassSecurityTrustUrl(value));
  });

  it('should bypass security for Script', () => {
    const value = 'alert("Test")';
    const result = pipe.transform(value, 'script');
    expect(result).toEqual(sanitizer.bypassSecurityTrustScript(value));
  });

  it('should bypass security for Style', () => {
    const value = 'body { background-color: red; }';
    const result = pipe.transform(value, 'style');
    expect(result).toEqual(sanitizer.bypassSecurityTrustStyle(value));
  });

  it('should bypass security for Resource URL', () => {
    const value = 'http://example.com/resource';
    const result = pipe.transform(value, 'resourceUrl');
    expect(result).toEqual(sanitizer.bypassSecurityTrustResourceUrl(value));
  });

  it('should throw an error for unknown mode', () => {
    expect(() => pipe.transform('value', 'unknown' as any)).toThrowError(
      'Unknown mode: unknown',
    );
  });
});
