import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementRef, Renderer2 } from '@angular/core';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { HeaderComponent } from '../../header.component';
import { NavMobileMenuToggleBtnComponent } from './nav-mobile-menu-toggle-btn.component';

describe('NavMobileMenuToggleBtnComponent', () => {
  let component: NavMobileMenuToggleBtnComponent;
  let fixture: ComponentFixture<NavMobileMenuToggleBtnComponent>;

  beforeEach(async () => {
    const elementRefMock = { nativeElement: document.createElement('div') };
    const renderer2Mock = {};
    
    await TestBed.configureTestingModule({
      imports: [ NavMobileMenuToggleBtnComponent, SharedTestingModule ],
      providers: [
        HeaderComponent,
        { provide: ElementRef, useValue: elementRefMock },
        { provide: Renderer2, useValue: renderer2Mock },
      ],
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
