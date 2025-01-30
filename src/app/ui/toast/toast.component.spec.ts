import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDetectorRef } from '@angular/core';
import { MockChangeDetectorRef } from 'src/test/mocks/change-detector-ref.mock';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ToastConfig } from './interfaces/toast-interfaces';
import { ToastComponent } from './toast.component';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedTestingModule, ToastComponent],
      providers: [
        {
          provide: ChangeDetectorRef,
          useClass: MockChangeDetectorRef,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a toast to the list and trigger change detection', () => {
    const toast: ToastConfig = { id: 1, message: 'Test toast', type: 'info' };
    component.add(toast);

    const toasts = component.toastList();
    expect(toasts.length).toBe(1);
    expect(toasts[0]).toEqual(toast);
  });

  it('should remove a toast by ID and trigger change detection', () => {
    const toast1: ToastConfig = { id: 1, message: 'Toast 1', type: 'info' };
    const toast2: ToastConfig = { id: 2, message: 'Toast 2', type: 'success' };
    component.add(toast1);
    component.add(toast2);

    component.remove(1);

    const toasts = component.toastList();
    expect(toasts.length).toBe(1);
    expect(toasts[0].id).toBe(2);
  });

  it('should not remove a toast if the ID does not exist', () => {
    const toast: ToastConfig = { id: 1, message: 'Test toast', type: 'info' };
    component.add(toast);

    component.remove(99);

    const toasts = component.toastList();
    expect(toasts.length).toBe(1);
    expect(toasts[0]).toEqual(toast);
  });
});
