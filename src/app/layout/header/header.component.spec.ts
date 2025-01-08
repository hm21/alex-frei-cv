import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementRef, Injector } from '@angular/core';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { NavMobileMenuToggleBtnComponent } from './components/nav-mobile-menu-toggle-btn/nav-mobile-menu-toggle-btn.component';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, SharedTestingModule],
      providers: [
        { provide: ElementRef, useValue: { nativeElement: { classList: { add: () => {}, remove: () => {} } } } },
        { provide: NavMobileMenuToggleBtnComponent, useValue: { open: { set: () => {} } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle mobile menu visibility', () => {
    const injector = TestBed.inject(Injector);
    const headerElement = injector.get(ElementRef);
    const toggleBtnComponent = injector.get(NavMobileMenuToggleBtnComponent);

    spyOn(component, 'header' as any).and.returnValue(headerElement);
    spyOn(component, 'toggleBtn').and.returnValue(toggleBtnComponent);
    spyOn(headerElement.nativeElement.classList, 'add');
    spyOn(headerElement.nativeElement.classList, 'remove');
    spyOn(toggleBtnComponent.open, 'set');

    component.toggleMenu();
    expect(component.showMobileMenu()).toBeTrue();
    expect(headerElement.nativeElement.classList.add).toHaveBeenCalledWith(
      'show',
    );
    expect(toggleBtnComponent.open.set).toHaveBeenCalledWith(true);

    component.toggleMenu();
    expect(component.showMobileMenu()).toBeFalse();
    expect(headerElement.nativeElement.classList.remove).toHaveBeenCalledWith(
      'show',
    );
    expect(toggleBtnComponent.open.set).toHaveBeenCalledWith(false);
  });
});
