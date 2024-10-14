import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ProgressSpinnerComponent } from './progress-spinner.component';

describe('ProgressSpinnerComponent', () => {
  let component: ProgressSpinnerComponent;
  let fixture: ComponentFixture<ProgressSpinnerComponent>;

  const size = 48;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedTestingModule, ProgressSpinnerComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressSpinnerComponent);
    fixture.componentRef.setInput('size', size);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an SVG with the correct width and height based on size', () => {
    const svgElement: SVGElement = fixture.nativeElement.querySelector('svg');

    expect(svgElement).not.toBeNull();

    const { width, height } = svgElement.getBoundingClientRect();

    expect(width).toBe(size);
    expect(height).toBe(size);
  });
});
