import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { MobileHeaderComponent } from './mobile-header.component';

describe('MobileHeaderComponent', () => {
  let component: MobileHeaderComponent;
  let fixture: ComponentFixture<MobileHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileHeaderComponent, SharedTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call headerService.toggleMenu when toggleMenu is called', () => {
    const headerServiceSpy = spyOn(
      (component as any).headerService,
      'toggleMenu',
    );
    component.toggleMenu();
    expect(headerServiceSpy).toHaveBeenCalled();
  });

  it('should call headerService.closeMenu when closeMenu is called', () => {
    const headerServiceSpy = spyOn(
      (component as any).headerService,
      'closeMenu',
    );
    component.closeMenu();
    expect(headerServiceSpy).toHaveBeenCalled();
  });
});
