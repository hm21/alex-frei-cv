import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IS_BROWSER } from 'src/app/core/providers/platform.provider';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { sleep } from 'src/test/utils/sleep.test';
import { ProgressBarComponent } from './progress-bar.component';

describe('ProgressBarComponent browser', () => {
  describe('Browser', () => {
    let component: ProgressBarComponent;
    let fixture: ComponentFixture<ProgressBarComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ProgressBarComponent, SharedTestingModule],
      }).compileComponents();

      fixture = TestBed.createComponent(ProgressBarComponent);
      fixture.componentRef.setInput('progress', 50);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should set progress input correctly', () => {
      expect(component.progress()).toBe(50);
    });

    it('should set delay input correctly', () => {
      fixture.componentRef.setInput('delay', 100);
      fixture.detectChanges();
      expect(component.delay()).toBe(100);
    });

    it('should initialize scroll listener after view init', () => {
      spyOn(component as any, 'initScrollListener');
      component.ngAfterViewInit();
      expect((component as any).initScrollListener).toHaveBeenCalled();
    });

    it('should update progress bar width on scroll', async () => {
      fixture.componentRef.setInput('progress', 75);
      fixture.detectChanges();

      const barElement = component.elRef.nativeElement;
      spyOn(barElement, 'getBoundingClientRect').and.returnValue({
        top: 100,
      } as any);

      window.dispatchEvent(new Event('scroll'));
      await sleep(100);

      expect(component['barRef']().nativeElement.style.width).toBe('75%');
    });
    it('should update progress bar width on scroll with document height', async () => {
      fixture.componentRef.setInput('progress', 75);
      fixture.detectChanges();
      component['window'] = null as any;

      const barElement = component.elRef.nativeElement;
      spyOn(barElement, 'getBoundingClientRect').and.returnValue({
        top: 100,
      } as any);

      window.dispatchEvent(new Event('scroll'));
      await sleep(100);

      expect(component['barRef']().nativeElement.style.width).toBe('75%');
    });
  });
  describe('Server', () => {
    let component: ProgressBarComponent;
    let fixture: ComponentFixture<ProgressBarComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ProgressBarComponent, SharedTestingModule],
        providers: [{ provide: IS_BROWSER, useValue: false }],
      }).compileComponents();

      fixture = TestBed.createComponent(ProgressBarComponent);
      component = fixture.componentInstance;
      fixture.componentRef.setInput('progress', 50);
      fixture.detectChanges();
    });

    it('should not initialize scroll listener after view init', () => {
      spyOn(component as any, 'initScrollListener');
      component.ngAfterViewInit();
      expect((component as any).initScrollListener).not.toHaveBeenCalled();
    });
  });
});
