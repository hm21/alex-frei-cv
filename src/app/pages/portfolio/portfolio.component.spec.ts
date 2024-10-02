import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContainerRef } from '@angular/core';
import { ModalManager } from 'src/app/services/modal-manager/modal-manager.service';
import { viewContainerRefMock } from 'src/test/mocks/view-container-ref.mock';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { PortfolioComponent } from './portfolio.component';

describe('PortfolioComponent', () => {
  let component: PortfolioComponent;
  let fixture: ComponentFixture<PortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioComponent, SharedTestingModule],
      providers: [
      
        {
          provide: ViewContainerRef,
          useValue: viewContainerRefMock,
        },
        ModalManager,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
