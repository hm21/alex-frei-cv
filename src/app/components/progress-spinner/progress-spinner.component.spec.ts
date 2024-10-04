import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ProgressSpinnerComponent } from './progress-spinner.component';

describe('ProgressSpinnerComponent', () => {
  let component: ProgressSpinnerComponent;
  let fixture: ComponentFixture<ProgressSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedTestingModule, ProgressSpinnerComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should render an SVG with the correct width and height based on size', () => {
    const svgElement: SVGElement =
      fixture.nativeElement.querySelector('.loading-spinner');

    const initialSize = component.size().toString();
    const newSize = '48';

    expect(svgElement.getAttribute('width')).toBe(initialSize);
    expect(svgElement.getAttribute('height')).toBe(initialSize);

    fixture.componentRef.setInput('size', newSize);
    fixture.detectChanges();
    expect(svgElement.getAttribute('width')).toBe(newSize);
    expect(svgElement.getAttribute('height')).toBe(newSize);
  });
});
