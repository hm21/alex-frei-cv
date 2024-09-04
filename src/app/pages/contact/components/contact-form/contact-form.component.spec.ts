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
      firstname: 'John',
      lastname: 'Doe',
      msg: 'Test message',
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
    expect(component.form.contains('firstname')).toBeTruthy();
    expect(component.form.contains('lastname')).toBeTruthy();
    expect(component.form.contains('msg')).toBeTruthy();
    expect(component.form.contains('email')).toBeTruthy();
  });

  it('should mark form as invalid if fields are empty', () => {
    component.form.setValue({
      firstname: '',
      lastname: '',
      msg: '',
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
      firstname: 'John',
      lastname: 'Doe',
      msg: 'Hello!',
      email: 'john.doe@example.com',
    });
    fixture.detectChanges();
    expect(submitButton.nativeElement.disabled).toBeFalse();
  });

  it('should update formState to error if form is invalid on submit', () => {
    component.form.setValue({
      firstname: '',
      lastname: '',
      msg: '',
      email: '',
    });
    component.submit$.next();
    expect(component.formState()).toEqual({
      state: 'error',
      msg: CONTACT_MESSAGES.invalidEmail,
      canSend: true,
    });
  });

  it('should send form data when form is valid and update formState to success', () => {
    component.form.setValue({
      firstname: 'John',
      lastname: 'Doe',
      msg: 'Hello!',
      email: 'john.doe@example.com',
    });
    component.submit$.next();

    const req = httpMock.expectOne(endpoints.contactMessage);
    expect(req.request.method).toBe('POST');
    req.flush({});

    expect(component.formState().state).toBe('success');
    expect(component.formState().msg).toBe(
      CONTACT_MESSAGES.submissionSuccess,
    );
    expect(component.formState().canSend).toBeFalse();
  });

  it('should handle error response correctly', () => {
    component.form.setValue({
      firstname: 'John',
      lastname: 'Doe',
      msg: 'Hello!',
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
      msg: jasmine.any(String),
      canSend: true,
    });
  });
});
