import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component } from '@angular/core';
import { Modal } from 'src/app/ui/modal/modal.base';
import { ModalService } from 'src/app/ui/modal/modal.service';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { runPageMetaTests } from 'src/test/utils/page-meta-test.helper';
import { sleep } from 'src/test/utils/sleep.test';
import { ResumeComponent } from './resume.component';

@Component({
  template: ` <div afTooltip="test"></div> `,
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
})
class TestComponent extends Modal<any> {}

describe('ResumeComponent', () => {
  let component: ResumeComponent;
  let fixture: ComponentFixture<ResumeComponent>;
  let modalService: ModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeComponent, SharedTestingModule],
      providers: [ModalService],
      declarations: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    modalService = TestBed.inject(ModalService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  runPageMetaTests(() => component);

  it('should add page-padding class on init', () => {
    expect(component.classList.contains('page-padding')).toBeTrue();
  });

  it('should handle modal state changes', async () => {
    modalService.open<TestComponent, any>(TestComponent, {});

    spyOnProperty(modalService.document.body, 'scrollWidth').and.returnValue(
      modalService.document.body.clientWidth + 10,
    );

    fixture.detectChanges();

    await sleep(1);

    expect(component.elRef.nativeElement.style.marginRight).toBe(
      `${modalService.scrollbarWidth}px`,
    );

    modalService.close();
    fixture.detectChanges();

    expect(component.elRef.nativeElement.style.marginRight).toBe('');
  });
});
