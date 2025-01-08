import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PROJECT_SNAPTAB } from 'src/app/shared/constants/projects/project-snaptab.constants';
import { ModalService } from 'src/app/ui/modal/modal.service';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ProjectDetailsComponent } from '../project-details/project-details.component';
import { BusinessProjectsComponent } from './business-projects.component';

describe('BusinessProjectsComponent', () => {
  let component: BusinessProjectsComponent;
  let fixture: ComponentFixture<BusinessProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessProjectsComponent, SharedTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open project details modal with correct data', () => {
    const modalService = TestBed.inject(ModalService);
    const openSpy = spyOn(modalService, 'open').and.callThrough();

    component.openProject();

    expect(openSpy).toHaveBeenCalledWith(ProjectDetailsComponent, {
      data: PROJECT_SNAPTAB,
      injector: component['injector'],
    });
  });
});
