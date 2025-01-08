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
    fixture.componentRef.setInput('diameter', size);
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

  it('should set the mode to indeterminate by default', () => {
    expect(component.mode()).toBe('indeterminate');
  });

  it('should set the value to 0 by default', () => {
    expect(component.value()).toBe(0);
  });

  it('should set the stroke width to 5 by default', () => {
    expect(component['strokeWidth']()).toBe(5);
  });
  it('should set the stroke width to 5 by default when input is null', () => {
    fixture.componentRef.setInput('strokeWidth', null);
    expect(component['strokeWidth']()).toBe(5);
  });
  it('should set the stroke width to value from input', () => {
    fixture.componentRef.setInput('strokeWidth', '10');
    expect(component['strokeWidth']()).toBe(10);
  });
  it('should set the stroke width to 0 when input is invalid', () => {
    fixture.componentRef.setInput('strokeWidth', 'A');
    expect(component['strokeWidth']()).toBe(0);
  });

  it('should set the value to 0 by default when input is null', () => {
    fixture.componentRef.setInput('value', null);
    expect(component['value']()).toBe(0);
  });
  it('should set value to input value', () => {
    fixture.componentRef.setInput('value', '10');
    expect(component['value']()).toBe(10);
  });

  it('should calculate the radius correctly', () => {
    expect(component['radius']()).toBe((size - 5) / 2);
  });

  it('should calculate the stroke circumference correctly', () => {
    const expectedCircumference = Math.PI * component['radius']() * 2;
    expect(component['strokeCircumference']()).toBe(expectedCircumference);
  });

  it('should calculate the stroke dash offset correctly', () => {
    const expectedOffset =
      (component['strokeCircumference']() * (100 - component.value())) / 100;
    expect(component['strokeDashOffset']()).toBe(expectedOffset);
  });

  it('should calculate the view box correctly', () => {
    const expectedViewBox = `0 0 ${component['radius']() * 2 + component['strokeWidth']()} ${component['radius']() * 2 + component['strokeWidth']()}`;
    expect(component['viewBox']()).toBe(expectedViewBox);
  });

  it('should calculate the circle stroke width in percent correctly', () => {
    const expectedStrokeWidthPercent =
      (component['strokeWidth']() / component.diameter()) * 100;
    expect(component['circleStrokeWidth']()).toBe(expectedStrokeWidthPercent);
  });
});
