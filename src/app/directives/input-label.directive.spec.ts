import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ExtendedValidators } from '../utils/extended-form-validators';
import { InputLabelDirective } from './input-label.directive';

@Component({
  template: `
    <form [formGroup]="form">
      <input
        afInputLabel
        formControlName="control"
        id="test-id"
        label="Test Label"
      />
    </form>
  `,
  standalone: false,
})
class TestComponent {
  form = new FormGroup({
    control: new FormControl('', {
      validators: ExtendedValidators.requiredNonWhitespace,
    }),
  });
}

describe('InputLabelDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let labelDirective: InputLabelDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, InputLabelDirective, SharedTestingModule],
      declarations: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const directiveEl = fixture.debugElement.query(
      By.directive(InputLabelDirective),
    );
    labelDirective = directiveEl.injector.get(InputLabelDirective);
  });

  it('should create a label element with correct attributes', () => {
    const label = labelDirective['labelRef'];
    expect(label).toBeTruthy();
    expect(label.innerHTML).toBe('Test Label');
    expect(label.classList).toContain('ng-untouched');
    expect(label.htmlFor).toBe('test-id');
  });
});
