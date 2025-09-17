import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { TooltipItem } from '../../types/tooltip.type';
import { TooltipItemComponent } from './tooltip-item.component';

describe('TooltipItemComponent', () => {
  let component: TooltipItemComponent;
  let fixture: ComponentFixture<TooltipItemComponent>;
  let mockElementRef: ElementRef<HTMLElement>;

  beforeEach(() => {
    const mockParentElement = document.createElement('div');
    mockParentElement.getBoundingClientRect = () =>
      ({
        top: 100,
        left: 50,
        width: 200,
        height: 50,
        bottom: 150,
        right: 250,
        x: 50,
        y: 100,
      }) as DOMRect;
    mockElementRef = {
      nativeElement: mockParentElement,
    } as ElementRef<HTMLElement>;

    TestBed.configureTestingModule({
      imports: [SharedTestingModule, TooltipItemComponent],
      providers: [{ provide: ElementRef, useValue: mockElementRef }],
      teardown: { destroyAfterEach: false },
    }).compileComponents();

    fixture = TestBed.createComponent(TooltipItemComponent);
    fixture.componentRef.setInput('item', {
      id: 'tooltip1',
      visible: false,
      message: 'Test Tooltip',
      parent: mockElementRef.nativeElement,
    } as TooltipItem);

    component = fixture.componentInstance;
    component.ngAfterViewInit();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should update position on animation start', () => {
    spyOn<any>(component, 'updateTooltipPosition');
    component.onAnimationStart();
    expect(component['updateTooltipPosition']).toHaveBeenCalled();
  });

  it('should update position on animation done', () => {
    spyOn<any>(component, 'updateTooltipPosition');
    component.onAnimationDone();
    expect(component['updateTooltipPosition']).toHaveBeenCalled();
  });

  it('should clean up resize observer on destroy', () => {
    const unobserveSpy = jasmine.createSpy();
    component['resizeObserver'] = {
      unobserve: unobserveSpy,
    } as unknown as ResizeObserver;
    component.ngOnDestroy();
    expect(unobserveSpy).toHaveBeenCalledWith(component.item().parent);
  });
});
