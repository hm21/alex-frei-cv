import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { SideNavbarComponent } from './side-navbar.component';

describe('SideNavbarComponent', () => {
  let component: SideNavbarComponent;
  let fixture: ComponentFixture<SideNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideNavbarComponent, SharedTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SideNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
