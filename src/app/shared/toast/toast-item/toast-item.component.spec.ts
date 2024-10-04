import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDetectorRef } from '@angular/core';
import { MockChangeDetectorRef } from 'src/test/mocks/change-detector-ref.mock';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ToastI } from '../utils/toast-interfaces';
import { ToastItemComponent } from './toast-item.component';

describe('ToastItemComponent', () => {
  let fixture: ComponentFixture<ToastItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      providers: [
        {
          provide: ChangeDetectorRef,
          useClass: MockChangeDetectorRef,
        },
      ],
      teardown: { destroyAfterEach: false },
    });
    fixture = TestBed.createComponent(ToastItemComponent);
  });

  it('should create', () => {
    fixture.componentRef.setInput('toast', 'Test Message');
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should set styles based on the toast type', () => {
    fixture.componentRef.setInput('toast', {
      id: 1,
      type: 'info',
      message: 'Test message',
    } as ToastI);

    const color = 'var(--color-info)';
    const component = fixture.componentInstance;

    component.ngOnInit();

    expect(component.elRef.nativeElement.style.color).toBe(color);
    expect(component.elRef.nativeElement.style.borderColor).toBe(color);
  });

  it('should add accent background with the correct color', () => {
    fixture.componentRef.setInput('toast', {
      id: 1,
      type: 'warning',
      message: 'Warning message',
    } as ToastI);

    const color = 'var(--color-warning)';
    const component = fixture.componentInstance;

    component.ngOnInit();

    const accentBackground = component.elRef.nativeElement.querySelector('div');
    expect(accentBackground).toBeTruthy();
    expect(accentBackground!.style.background).toBe(color);
  });
});
