import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component } from '@angular/core';
import { take } from 'rxjs';
import { Modal } from 'src/app/ui/modal/modal.base';
import { ModalService } from 'src/app/ui/modal/modal.service';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { runPageMetaTests } from 'src/test/utils/page-meta-test.helper';
import { PortfolioComponent } from './portfolio.component';

@Component({
  selector: 'af-mock',
  template: '',
})
class MockComponent extends Modal<any> {}

describe('PortfolioComponent', () => {
  let component: PortfolioComponent;
  let modalService: ModalService;
  let fixture: ComponentFixture<PortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioComponent, SharedTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    modalService = TestBed.inject(ModalService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  runPageMetaTests(() => component);

  it('should add page-padding class on init', () => {
    const element = component.elRef.nativeElement;
    expect(element.classList).toContain('page-padding');
  });

  it('should handle modal state changes', () => {
    modalService.onChangeState$.pipe(take(1)).subscribe((res) => {
      expect(res).toBe('open');
    });

    modalService.open<MockComponent, any>(MockComponent);
    fixture.detectChanges();

    modalService.onChangeState$.pipe(take(1)).subscribe((res) => {
      expect(res).toBe('close');
    });

    modalService.close();
    fixture.detectChanges();
  });
});
