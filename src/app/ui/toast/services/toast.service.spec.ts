import { TestBed } from '@angular/core/testing';

import { ComponentRef } from '@angular/core';
import { of } from 'rxjs';
import { IS_BROWSER } from 'src/app/core/providers/platform.provider';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { sleep } from 'src/test/utils/sleep.test';
import { ToastConfig } from '../interfaces/toast-interfaces';
import { TOAST_VIEW_CONTAINER_REF } from '../providers/toast.provider';
import { ToastComponent } from '../toast.component';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;
  let toastComponentRef: ComponentRef<ToastComponent>;

  beforeEach(() => {
    toastComponentRef = {
      instance: {
        add: jasmine.createSpy('add'),
        remove: jasmine.createSpy('remove'),
        closeToast: of({} as ToastConfig),
      },
    } as any;

    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      providers: [
        {
          provide: TOAST_VIEW_CONTAINER_REF,
          useValue: { createComponent: () => toastComponentRef },
        },
        { provide: IS_BROWSER, useValue: true },
      ],
      teardown: { destroyAfterEach: false },
    });
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should display a success toast', () => {
    service.success('Success message');
    expect(toastComponentRef.instance.add).toHaveBeenCalledWith(
      jasmine.objectContaining({ message: 'Success message', type: 'success' }),
    );
  });

  it('should display an info toast', () => {
    service.info('Info message');
    expect(toastComponentRef.instance.add).toHaveBeenCalledWith(
      jasmine.objectContaining({ message: 'Info message', type: 'info' }),
    );
  });

  it('should display a warning toast', () => {
    service.warning('Warning message');
    expect(toastComponentRef.instance.add).toHaveBeenCalledWith(
      jasmine.objectContaining({ message: 'Warning message', type: 'warning' }),
    );
  });

  it('should display an error toast', () => {
    service.error('Error message');
    expect(toastComponentRef.instance.add).toHaveBeenCalledWith(
      jasmine.objectContaining({ message: 'Error message', type: 'danger' }),
    );
  });

  it('should start a progress toast', async () => {
    service.progress('Progress message', 'progressId', 1000);
    await sleep(1000);
    expect(toastComponentRef.instance.add).toHaveBeenCalledWith(
      jasmine.objectContaining({
        message: 'Progress message',
        type: 'info',
        spinner: true,
        id: 'progressId',
      }),
    );
  });

  it('should close a progress toast', async () => {
    service.progress('Progress message', 'progressId', 1000);
    await sleep(1000);
    service.closeProgress('progressId');
    await sleep(1);
    expect(toastComponentRef.instance.remove).toHaveBeenCalledWith(
      'progressId',
    );
  });

  it('should close a specific toast', () => {
    const toastConfig: ToastConfig = {
      id: 'toastId',
      message: 'Toast message',
      type: 'info',
    };
    service.closeToast(toastConfig);
    expect(toastComponentRef.instance.remove).toHaveBeenCalledWith('toastId');
  });

  it('should not display duplicate toasts', () => {
    service['generate']('Duplicate message', 'info');
    service['generate']('Duplicate message', 'info');
    expect(toastComponentRef.instance.add).toHaveBeenCalledTimes(1);
  });

  it('should close a progress toast immediately if no delay is provided', async () => {
    service.progress('Progress message', 'progressId', 0);
    service.closeProgress('progressId');
    await sleep(1);
    expect(toastComponentRef.instance.remove).toHaveBeenCalledWith(
      'progressId',
    );
  });

  it('should set non existing toastId count to 0', () => {
    const id = 'nonExistentId';
    service.closeProgress(id);
    expect(service.activeIdList[id]).toBe(0);
  });

  it('should reduce active list after toast finish', async () => {
    const message = 'test';
    const id = `${message}success`;

    service.success({ message: message, duration: 5 });
    expect(service.activeIdList[id]).toBe(1);
    service.success({ message: message, duration: 10 });
    expect(service.activeIdList[id]).toBe(2);

    await sleep(6);
    expect(service.activeIdList[id]).toBe(1);
    await sleep(6);
    expect(service.activeIdList[id]).toBe(0);
  });
});
