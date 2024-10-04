import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
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
});
