import { DOCUMENT } from '@angular/common';
import { ElementRef, Renderer2, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxCountService } from 'ngx-count-animation';
import { NgxScrollAnimationsService } from 'ngx-scroll-animations';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { AppComponent } from './app.component';
import { NavMobileMenuToggleBtnComponent } from './layout/header/components/nav-mobile-menu-toggle-btn/nav-mobile-menu-toggle-btn.component';
import { HeaderComponent } from './layout/header/header.component';
import { ModalManagerService } from './services/modal-manager.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        HeaderComponent,
        NavMobileMenuToggleBtnComponent,
        SharedTestingModule
      ],
      providers: [
        NgxScrollAnimationsService,
        NgxCountService,
        ModalManagerService,
        Renderer2,
        { provide: DOCUMENT, useValue: document },
        { provide: ElementRef, useValue: { nativeElement: {} } },
        { provide: ViewContainerRef, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
