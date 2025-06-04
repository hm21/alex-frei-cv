import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PROJECT_SNAPTAB } from 'src/app/shared/constants/projects/project-snaptab.constants';
import { ModalService } from 'src/app/ui/modal/modal.service';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ProjectDetailsComponent } from '../project-details/project-details.component';
import { ProjectCardComponent } from './project-card.component';

describe('ProjectCardComponent', () => {
  let component: ProjectCardComponent;
  let fixture: ComponentFixture<ProjectCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCardComponent, SharedTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('project', PROJECT_SNAPTAB);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct icon properties', () => {
    expect(component['iconDemo']).toBeDefined();
    expect(component['iconView']).toBeDefined();
    expect(component['iconGithub']).toBeDefined();
    expect(component['iconWebsite']).toBeDefined();
  });

  it('should have a required project input', () => {
    expect(component.project).toBeDefined();
    expect(typeof component.project).toBe('function');
    expect(component.project()).toEqual(PROJECT_SNAPTAB);
  });

  it('should call modal.open with correct arguments when openProject is called', () => {
    const modalService = TestBed.inject(ModalService);
    const openSpy = spyOn(modalService, 'open').and.callThrough();

    component.openProject();

    expect(openSpy).toHaveBeenCalledWith(
      ProjectDetailsComponent,
      jasmine.objectContaining({
        data: PROJECT_SNAPTAB,
        injector: jasmine.anything(),
      }),
    );
  });
});
