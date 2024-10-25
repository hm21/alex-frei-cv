import { TestBed } from '@angular/core/testing';

import { ComponentRef } from '@angular/core';
import { IS_BROWSER } from 'src/app/utils/providers/platform.provider';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { TooltipComponent } from './tooltip.component';
import { TooltipService } from './tooltip.service';
import { TooltipItem } from './utils/tooltip.interface';
import { TOOLTIP_VIEW_CONTAINER_REF } from './utils/tooltip.provider';

describe('TooltipService', () => {
  let service: TooltipService;
  let mockTooltipComponentRef: jasmine.SpyObj<ComponentRef<TooltipComponent>>;
  let mockViewContainerRef: { createComponent: jasmine.Spy };

  beforeEach(() => {
    // Mock TooltipComponent's instance and its methods (show, hide, create, remove)
    const tooltipComponentInstance = jasmine.createSpyObj<TooltipComponent>(
      'TooltipComponent',
      ['create', 'show', 'hide', 'remove'],
    );

    // Mock ComponentRef for TooltipComponent
    mockTooltipComponentRef = jasmine.createSpyObj('ComponentRef', [], {
      instance: tooltipComponentInstance,
    });

    // Mock ViewContainerRef with a createComponent spy
    mockViewContainerRef = {
      createComponent: jasmine
        .createSpy()
        .and.returnValue(mockTooltipComponentRef),
    };

    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      providers: [
        TooltipService,
        { provide: TOOLTIP_VIEW_CONTAINER_REF, useValue: mockViewContainerRef },
      ],
      teardown: { destroyAfterEach: false },
    });
    service = TestBed.inject(TooltipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create the TooltipService', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new tooltip via TooltipComponent', () => {
    const tooltipItem: TooltipItem = {
      id: 'test-tooltip',
      visible: false,
      message: 'Test Tooltip',
      parent: document.createElement('div'),
    };

    service.create(tooltipItem);
    expect(mockTooltipComponentRef.instance.create).toHaveBeenCalledWith(
      tooltipItem,
    );
  });

  it('should show a tooltip by ID', () => {
    const tooltipId = 'test-tooltip-id';
    service.show(tooltipId);
    expect(mockTooltipComponentRef.instance.show).toHaveBeenCalledWith(
      tooltipId,
    );
  });

  it('should hide a tooltip by ID', () => {
    const tooltipId = 'test-tooltip-id';
    service.hide(tooltipId);
    expect(mockTooltipComponentRef.instance.hide).toHaveBeenCalledWith(
      tooltipId,
    );
  });

  it('should remove a tooltip by ID', () => {
    const tooltipId = 'test-tooltip-id';
    service.remove(tooltipId);
    expect(mockTooltipComponentRef.instance.remove).toHaveBeenCalledWith(
      tooltipId,
    );
  });

  it('should not create tooltips if not in browser environment', () => {
    TestBed.resetTestingModule(); // Reset the testing module to change IS_BROWSER value
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      providers: [
        { provide: TOOLTIP_VIEW_CONTAINER_REF, useValue: mockViewContainerRef },
        { provide: IS_BROWSER, useValue: false }, // Set IS_BROWSER to false
        TooltipService,
      ],
      teardown: { destroyAfterEach: false },
    });

    const nonBrowserService = TestBed.inject(TooltipService);
    const tooltipItem: TooltipItem = {
      id: 'test-tooltip',
      visible: false,
      message: 'Test Tooltip',
      parent: document.createElement('div'),
    };

    nonBrowserService.create(tooltipItem);
    expect(mockTooltipComponentRef.instance.create).not.toHaveBeenCalled();
  });
});
