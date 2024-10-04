import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
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
});
