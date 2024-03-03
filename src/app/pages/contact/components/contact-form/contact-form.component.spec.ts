import { HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ContactFormComponent } from './contact-form.component';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactFormComponent, ReactiveFormsModule, SharedTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
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
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send form data', () => {
    const mockResponse = {
      success: true,
      message: 'Form submission successful',
    };

    component.sendForm();

    const req = httpMock.expectOne(environment.endpoints.contactMessage);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    expect(component['_sending']).toBeFalse();
    expect(component['_sended']).toBeTrue();
  });

  it('should handle error responses', () => {
    const mockErrorResponse = { status: 400, statusText: 'Bad Request' };

    component.sendForm();

    const req = httpMock.expectOne(environment.endpoints.contactMessage);
    expect(req.request.method).toBe('POST');
    req.flush({}, mockErrorResponse);
    expect(component['_sending']).toBeFalse();
  });
});
