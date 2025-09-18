import { HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CONTACT_MESSAGES } from 'src/app/core/constants/contact-options.constants';
import { ENDPOINTS } from 'src/app/core/providers/endpoints/endpoints.provider';
import { Endpoints } from 'src/app/core/providers/endpoints/types/endpoints.type';
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
    req.flush('Blacklist', { status: 400, statusText: 'Bad Request' });

    expect(component.formState()).toEqual({
      state: 'error',
      message: jasmine.stringMatching(/Blacklist/),
      canSend: false,
    });
  });
  it('should handle blacklist error correctly', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'Blacklist',
      status: 400,
      statusText: 'Bad Request',
    });

    component['handleError'](errorResponse).subscribe((res) => {
      expect(res).toBe('error');
      expect(component.formState()).toEqual({
        state: 'error',
        message: jasmine.stringMatching(/Blacklist/),
        canSend: false,
      });
    });
  });

  it('should handle 400 error correctly', () => {
    const errorResponse = new HttpErrorResponse({
      status: 400,
      statusText: 'Bad Request',
    });

    spyOn(component['toast'], 'error');

    component['handleError'](errorResponse).subscribe((res) => {
      expect(res).toBe('error');
      expect(component.formState()).toEqual({
        state: '',
        canSend: true,
      });
      expect(component['toast'].error).toHaveBeenCalledWith(
        CONTACT_MESSAGES.error400,
      );
    });
  });

  it('should handle 403 error correctly', () => {
    const errorResponse = new HttpErrorResponse({
      status: 403,
      statusText: 'Forbidden',
    });

    spyOn(component['toast'], 'error');

    component['handleError'](errorResponse).subscribe((res) => {
      expect(res).toBe('error');
      expect(component.formState()).toEqual({
        state: '',
        canSend: true,
      });
      expect(component['toast'].error).toHaveBeenCalledWith(
        CONTACT_MESSAGES.error403,
      );
    });
  });

  it('should handle unknown error correctly', () => {
    const errorResponse = new HttpErrorResponse({
      status: 500,
      statusText: 'Internal Server Error',
    });

    spyOn(component['toast'], 'error');

    component['handleError'](errorResponse).subscribe((res) => {
      expect(res).toBe('error');
      expect(component.formState()).toEqual({
        state: '',
        canSend: true,
      });
      expect(component['toast'].error).toHaveBeenCalledWith(
        CONTACT_MESSAGES.unknownError,
      );
    });
  });

  it('should disable form and set error state if sendTries >= 10', () => {
    component['sendTries'] = 10;
    component.form.setValue({
      givenName: 'John',
      familyName: 'Doe',
      message: 'Hello!',
      email: 'john.doe@example.com',
    });
    component['updateFormState'](component.form);
    expect(component.form.disabled).toBeTrue();
    expect(component.formState()).toEqual({
      state: 'error',
      message: CONTACT_MESSAGES.tooManyAttempts,
      canSend: false,
    });
  });

  it('should not change form state if form is valid and sendTries < 10', () => {
    component['sendTries'] = 5;
    component.form.setValue({
      givenName: 'John',
      familyName: 'Doe',
      message: 'Hello!',
      email: 'john.doe@example.com',
    });
    component['updateFormState'](component.form);
    expect(component.formState()).toEqual({ state: '', canSend: true });
  });
  it('should reset form state to default when form value changes and state is error', () => {
    component.formState.set({ state: 'error', canSend: false });
    component.form.controls.givenName.setValue('Jane');
    fixture.detectChanges();
    expect(component.formState()).toEqual({ state: '', canSend: true });
  });

  it('should call listenFormSubmit on ngOnInit', () => {
    spyOn<any>(component, 'listenFormSubmit');
    component.ngOnInit();
    expect(component['listenFormSubmit']).toHaveBeenCalled();
  });

  it('should mark all fields as touched and show warning toast if form is invalid', () => {
    spyOn(component['toast'], 'warning');
    component.form.setValue({
      givenName: '',
      familyName: '',
      message: '',
      email: 'invalid-email',
    });
    component['updateFormState'](component.form);
    expect(component.form.touched).toBeTrue();
    expect(component['toast'].warning).toHaveBeenCalled();
    expect(component.formState()).toEqual({ state: '', canSend: true });
  });
});
