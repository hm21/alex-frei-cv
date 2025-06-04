import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementRef } from '@angular/core';
import { ExtendedComponent } from 'src/app/shared/components/extended-component';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, SharedTestingModule],
      providers: [
        {
          provide: ElementRef,
          useValue: {
            nativeElement: { classList: { add: () => {}, remove: () => {} } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have isScrolled signal default to false', () => {
    expect(component['isScrolled']()).toBeFalse();
  });

  it('should call initializePageScroll and super.ngOnInit on ngOnInit', () => {
    const initSpy = spyOn<any>(
      component,
      'initializePageScroll',
    ).and.callThrough();
    const superSpy = spyOn(ExtendedComponent.prototype, 'ngOnInit');
    component.ngOnInit();
    expect(initSpy).toHaveBeenCalled();
    expect(superSpy).toHaveBeenCalled();
  });
});
