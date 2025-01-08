import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, ElementRef } from '@angular/core';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { HeaderComponent } from '../../header.component';
import { NavMobileMenuToggleBtnComponent } from './nav-mobile-menu-toggle-btn.component';

@Component({
  selector: 'af-mock-header',
  template: '<af-header></af-header>',
  imports: [HeaderComponent],
})
class MockHeaderComponent {
  toggleMenu() {}
}

describe('NavMobileMenuToggleBtnComponent', () => {
  let component: NavMobileMenuToggleBtnComponent;
  let fixture: ComponentFixture<NavMobileMenuToggleBtnComponent>;
  let mockHeaderComponent: MockHeaderComponent;

  beforeEach(async () => {
    const elementRefMock = { nativeElement: document.createElement('div') };

    await TestBed.configureTestingModule({
      imports: [
        NavMobileMenuToggleBtnComponent,
        SharedTestingModule,
        HeaderComponent,
      ],
      providers: [
        { provide: HeaderComponent, useClass: MockHeaderComponent },
        { provide: ElementRef, useValue: elementRefMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavMobileMenuToggleBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockHeaderComponent = TestBed.inject(HeaderComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the menu and create backdrop when menu is closed', () => {
    // Initial state: menu is closed
    component.open.set(false);

    // Spy on the header component's toggleMenu method
    spyOn(mockHeaderComponent, 'toggleMenu');

    // Call the toggleMenu method
    component.toggleMenu();

    // Verify if the menu was toggled
    expect(mockHeaderComponent.toggleMenu).toHaveBeenCalled();

    // Check if a backdrop is created
    const backdrop = document.getElementById('sidebar-backdrop');
    expect(backdrop).not.toBeNull();

    // Remove backdrop from test document
    backdrop?.remove();
  });

  it('should toggle the menu and remove backdrop when menu is open', async () => {
    // Spy on the header component's toggleMenu method
    spyOn(mockHeaderComponent, 'toggleMenu');

    // Call the toggleMenu method to open the menu
    component.open.set(false);
    component.toggleMenu();

    // Call the toggleMenu method to close the menu
    component.open.set(true);
    component.toggleMenu();

    // Verify if the menu was toggled
    expect(mockHeaderComponent.toggleMenu).toHaveBeenCalled();

    const animationEndEvent = new Event('animationend');
    component['tempBackdrop']?.dispatchEvent(animationEndEvent);

    // Verify that the backdrop was removed
    expect(document.getElementById('sidebar-backdrop')).toBeNull();
  });

  it('should close the menu and remove the backdrop', () => {
    // Spy on the header component's toggleMenu method
    spyOn(mockHeaderComponent, 'toggleMenu');

    // Call the toggleMenu method to open the menu
    component.open.set(false);
    component.toggleMenu();

    // Call the closeMenu method to close the menu
    component.closeMenu();

    // Verify if the menu was toggled
    expect(mockHeaderComponent.toggleMenu).toHaveBeenCalled();

    const animationEndEvent = new Event('animationend');
    component['tempBackdrop']?.dispatchEvent(animationEndEvent);

    // Verify that the backdrop was removed
    expect(document.getElementById('sidebar-backdrop')).toBeNull();
  });
});
