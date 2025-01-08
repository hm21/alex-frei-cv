import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalService } from 'src/app/ui/modal/modal.service';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { PROJECT_PRO_IMAGE_EDITOR } from '../../../../shared/constants/projects/project-pro_image_editor.constants';
import { ProjectDetailsComponent } from '../project-details/project-details.component';
import { OtherProjectsComponent } from './other-projects.component';

describe('OtherProjectsComponent', () => {
  let component: OtherProjectsComponent;
  let fixture: ComponentFixture<OtherProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherProjectsComponent, SharedTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(OtherProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open project details modal with correct data', () => {
    const modalService = TestBed.inject(ModalService);
    const openSpy = spyOn(modalService, 'open').and.callThrough();
    const projectItem = PROJECT_PRO_IMAGE_EDITOR;

    component.openProject(projectItem);

    expect(openSpy).toHaveBeenCalledWith(ProjectDetailsComponent, {
      data: projectItem,
      injector: component['injector'],
    });
  });
});
