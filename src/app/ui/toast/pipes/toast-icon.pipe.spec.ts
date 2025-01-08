import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import svgDanger from 'src/assets/img/icon/toast/danger.svg';
import svgInfo from 'src/assets/img/icon/toast/info.svg';
import svgSuccess from 'src/assets/img/icon/toast/success.svg';
import svgWarning from 'src/assets/img/icon/toast/warning.svg';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ToastIconPipe } from './toast-icon.pipe';

describe('ToastIconPipe', () => {
  let sanitizer: DomSanitizer;
  let pipe: ToastIconPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      teardown: { destroyAfterEach: false },
      imports: [SharedTestingModule],
      providers:[ToastIconPipe]
    });

    sanitizer = TestBed.inject(DomSanitizer);
    pipe = TestBed.inject(ToastIconPipe); 
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return sanitized success icon', () => {
    const result = pipe.transform('success');
    expect(result).toEqual(sanitizer.bypassSecurityTrustHtml(svgSuccess));
  });

  it('should return sanitized info icon', () => {
    const result = pipe.transform('info');
    expect(result).toEqual(sanitizer.bypassSecurityTrustHtml(svgInfo));
  });

  it('should return sanitized warning icon', () => {
    const result = pipe.transform('warning');
    expect(result).toEqual(sanitizer.bypassSecurityTrustHtml(svgWarning));
  });

  it('should return sanitized danger icon', () => {
    const result = pipe.transform('danger');
    expect(result).toEqual(sanitizer.bypassSecurityTrustHtml(svgDanger));
  });

  it('should return empty string for unknown type', () => {
    const result = pipe.transform('unknown' as any);
    expect(result).toEqual('');
  });
});
