import { TestBed } from '@angular/core/testing';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ServiceIconPipe } from './service-icon.pipe';

describe('ServiceIconPipe', () => {
  let pipe: ServiceIconPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      teardown: { destroyAfterEach: false },
      imports: [SharedTestingModule],
      providers: [ServiceIconPipe],
    });
    pipe = TestBed.inject(ServiceIconPipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('should transform "website" icon correctly', () => {
    const result = pipe.transform('website');
    expect(result).toBeTruthy();
  });

  it('should transform "app" icon correctly', () => {
    const result = pipe.transform('app');
    expect(result).toBeTruthy();
  });

  it('should transform "design" icon correctly', () => {
    const result = pipe.transform('design');
    expect(result).toBeTruthy();
  });

  it('should transform "backend" icon correctly', () => {
    const result = pipe.transform('backend');
    expect(result).toBeTruthy();
  });

  it('should throw an error for an unknown icon', () => {
    expect(() => pipe.transform('unknown' as any)).toThrowError(
      'Icon-Template is required!',
    );
  });
});
