import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { TooltipComponent } from './tooltip.component';
import { TooltipItem } from './types/tooltip.type';

describe('TooltipComponent', () => {
  let component: TooltipComponent;
  let fixture: ComponentFixture<TooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedTestingModule, TooltipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create and add a new tooltip item', () => {
    const newItem: TooltipItem = {
      id: 'tooltip1',
      visible: false,
      message: 'Test Tooltip',
      parent: document.createElement('div'),
    };

    component.create(newItem);
    expect(component.tooltips().length).toBe(1);
    expect(component.tooltips()[0]).toEqual(newItem);
  });

  it('should show a tooltip by setting its visible property to true', () => {
    const item: TooltipItem = {
      id: 'tooltip1',
      visible: false,
      message: 'Test Tooltip',
      parent: document.createElement('div'),
    };

    component.create(item);
    component.show(item.id);

    expect(component.tooltips()[0].visible).toBeTrue();
  });

  it('should hide a tooltip by setting its visible property to false', () => {
    const item: TooltipItem = {
      id: 'tooltip1',
      visible: true,
      message: 'Test Tooltip',
      parent: document.createElement('div'),
    };

    component.create(item);
    component.hide(item.id);

    expect(component.tooltips()[0].visible).toBeFalse();
  });

  it('should remove a tooltip by its ID', () => {
    const item1: TooltipItem = {
      id: 'tooltip1',
      visible: false,
      message: 'Test Tooltip 1',
      parent: document.createElement('div'),
    };

    const item2: TooltipItem = {
      id: 'tooltip2',
      visible: true,
      message: 'Test Tooltip 2',
      parent: document.createElement('div'),
    };

    component.create(item1);
    component.create(item2);
    component.remove(item1.id);

    expect(component.tooltips().length).toBe(1);
    expect(component.tooltips()[0].id).toBe('tooltip2');
  });

  it('should toggle visibility of a tooltip item', () => {
    const item: TooltipItem = {
      id: 'tooltip1',
      visible: false,
      message: 'Test Tooltip',
      parent: document.createElement('div'),
    };

    component.create(item);

    // Toggle visibility to true
    component['toggle']({ id: item.id, visible: true });
    expect(component.tooltips()[0].visible).toBeTrue();

    // Toggle visibility to false
    component['toggle']({ id: item.id, visible: false });
    expect(component.tooltips()[0].visible).toBeFalse();
  });
});
