import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalService } from 'src/app/ui/modal/modal.service';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ProjectDetails } from '../../types/project.type';
import { ProjectDetailsComponent } from '../project-details/project-details.component';
import { FeaturedProjectsComponent } from './featured-projects.component';

describe('FeaturedProjectsComponent', () => {
  let component: FeaturedProjectsComponent;
  let fixture: ComponentFixture<FeaturedProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedProjectsComponent, SharedTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a chevronRight property', () => {
    expect(component.chevronRight).toBeDefined();
  });

  it('should have a projects array with 3 items', () => {
    expect(component.projects.length).toBe(3);
    component.projects.forEach((project: ProjectDetails) => {
      expect(project).toBeTruthy();
    });
  });

  it('should call modal.open with correct arguments when openProject is called', () => {
    const modalService = TestBed.inject(ModalService);
    const project = component.projects[0];
    spyOn(modalService, 'open');
    component.openProject(project);
    expect(modalService.open).toHaveBeenCalledWith(
      ProjectDetailsComponent,
      jasmine.objectContaining({
        data: project,
        injector: jasmine.anything(),
      }),
    );
  });
});
