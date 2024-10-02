import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContainerRef } from '@angular/core';
import { ModalManager } from 'src/app/services/modal-manager/modal-manager.service';
import { viewContainerRefMock } from 'src/test/mocks/view-container-ref.mock';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { BusinessProjectsComponent } from './business-projects.component';

describe('BusinessProjectsComponent', () => {
  let component: BusinessProjectsComponent;
  let fixture: ComponentFixture<BusinessProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessProjectsComponent, SharedTestingModule],
      providers: [
        {
          provide: ViewContainerRef,
          useValue: viewContainerRefMock,
        },
        ModalManager,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
