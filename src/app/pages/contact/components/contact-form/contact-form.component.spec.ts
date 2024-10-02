import { HttpTestingController } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CONTACT_MESSAGES } from 'src/app/configs/contact-options';
import { Endpoints } from 'src/app/utils/providers/endpoints/endpoints.interface';
import { ENDPOINTS } from 'src/app/utils/providers/endpoints/endpoints.provider';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ContactFormComponent } from './contact-form.component';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let httpMock: HttpTestingController;
  let submitButton: DebugElement;
  let endpoints: Endpoints;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactFormComponent, ReactiveFormsModule, SharedTestingModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
 
    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    const formValue = {
      givenName: 'John',
      familyName: 'Doe',
      message: 'Test message',
      email: 'john.doe@example.com',
    };
    component.form.setValue(formValue);
    httpMock = TestBed.inject(HttpTestingController);
    endpoints = TestBed.inject(ENDPOINTS);
    fixture.detectChanges();
    submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with 4 controls', () => {
    expect(component.form.contains('givenName')).toBeTruthy();
    expect(component.form.contains('familyName')).toBeTruthy();
    expect(component.form.contains('message')).toBeTruthy();
    expect(component.form.contains('email')).toBeTruthy();
  });

  it('should mark form as invalid if fields are empty', () => {
    component.form.setValue({
      givenName: '',
      familyName: '',
      message: '',
      email: '',
    });
    expect(component.form.invalid).toBeTrue();
  });

  it('should mark email as invalid if email format is incorrect', () => {
    component.form.controls.email.setValue('invalid-email');
    expect(component.form.controls.email.invalid).toBeTrue();
  });

  it('should enable submit button when form is valid', () => {
    component.form.setValue({
      givenName: 'John',
      familyName: 'Doe',
      message: 'Hello!',
      email: 'john.doe@example.com',
    });
    fixture.detectChanges();
    expect(submitButton.nativeElement.disabled).toBeFalse();
  });

  it('should update formState to error if form is invalid on submit', () => {
    component.form.setValue({
      givenName: '',
      familyName: '',
      message: '',
      email: '',
    });
    component.submit$.next();
    expect(component.formState()).toEqual({
      state: 'error',
      message: CONTACT_MESSAGES.invalidEmail,
      canSend: true,
    });
  });

  it('should send form data when form is valid and update formState to success', () => {
    component.form.setValue({
      givenName: 'John',
      familyName: 'Doe',
      message: 'Hello!',
      email: 'john.doe@example.com',
    });
    component.submit$.next();

    const req = httpMock.expectOne(endpoints.contactMessage);
    expect(req.request.method).toBe('POST');
    req.flush({});

    expect(component.formState().state).toBe('success');
    expect(component.formState().message).toBe(
      CONTACT_MESSAGES.submissionSuccess,
    );
    expect(component.formState().canSend).toBeFalse();
  });

  it('should handle error response correctly', () => {
    component.form.setValue({
      givenName: 'John',
      familyName: 'Doe',
      message: 'Hello!',
      email: 'john.doe@example.com',
    });
    component.submit$.next();

    const req = httpMock.expectOne(endpoints.contactMessage);
    req.flush(
      { error: 'Blacklist' },
      { status: 400, statusText: 'Bad Request' },
    );

    expect(component.formState()).toEqual({
      state: 'error',
      message: jasmine.any(String),
      canSend: true,
    });
  });
});
