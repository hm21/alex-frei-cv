import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMobileMenuToggleBtnComponent } from './nav-mobile-menu-toggle-btn.component';

describe('NavMobileMenuToggleBtnComponent', () => {
  let component: NavMobileMenuToggleBtnComponent;
  let fixture: ComponentFixture<NavMobileMenuToggleBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavMobileMenuToggleBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavMobileMenuToggleBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
