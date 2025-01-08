import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IdManagerService } from 'src/app/core/services/id-manager/id-manager.service';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { TooltipService } from '../services/tooltip.service';
import { TooltipDirective } from './tooltip.directive';

@Component({
  template: ` <div afTooltip="test"></div> `,
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
})
class TestComponent {}

describe('TooltipDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let tooltipDirective: TooltipDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      teardown: { destroyAfterEach: false },
      imports: [SharedTestingModule, TooltipDirective],
      declarations: [TestComponent],
      providers: [
        TooltipService,
        IdManagerService,
        {
          provide: ElementRef,
          useValue: new ElementRef(document.createElement('div')),
        },
      ],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const directiveEl = fixture.debugElement.query(
      By.directive(TooltipDirective),
    );
    tooltipDirective = directiveEl.injector.get(TooltipDirective);
  });

  it('should create an instance', () => {
    expect(tooltipDirective).toBeTruthy();
  });

  it('should call create method on ngOnInit', () => {
    spyOn(tooltipDirective as any, 'create');
    tooltipDirective.ngOnInit();
    expect((tooltipDirective as any).create).toHaveBeenCalled();
  });

  it('should call remove method on ngOnDestroy', () => {
    spyOn(tooltipDirective as any, 'remove');
    tooltipDirective.ngOnDestroy();
    expect((tooltipDirective as any).remove).toHaveBeenCalled();
  });

  it('should show tooltip on mouseover and hide on mouseleave', () => {
     spyOn(tooltipDirective['tooltipService'], 'show');
    spyOn(tooltipDirective['tooltipService'], 'hide');

    tooltipDirective.ngOnInit();

    const mouseoverEvent = new Event('mouseover');
    const mouseleaveEvent = new Event('mouseleave');

    tooltipDirective['nativeElement'].dispatchEvent(mouseoverEvent);
    expect(tooltipDirective['tooltipService'].show).toHaveBeenCalledWith(
      tooltipDirective['id'],
    );

    tooltipDirective['nativeElement'].dispatchEvent(mouseleaveEvent);
    expect(tooltipDirective['tooltipService'].hide).toHaveBeenCalledWith(
      tooltipDirective['id'],
    );
  });
});
