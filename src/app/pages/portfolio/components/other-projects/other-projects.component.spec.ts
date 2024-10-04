import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContainerRef } from '@angular/core';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { viewContainerRefMock } from 'src/test/mocks/view-container-ref.mock';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { OtherProjectsComponent } from './other-projects.component';

describe('OtherProjectsComponent', () => {
  let component: OtherProjectsComponent;
  let fixture: ComponentFixture<OtherProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherProjectsComponent, SharedTestingModule],
      providers: [
        {
          provide: ViewContainerRef,
          useValue: viewContainerRefMock,
        },
        ModalService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OtherProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
