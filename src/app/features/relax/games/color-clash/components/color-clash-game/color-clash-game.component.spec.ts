import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ColorClashManagerService } from '../../services/color-clash-manager.service';
import { ColorClashItemId } from '../types/color-clash.types';
import { ColorClashGameComponent } from './color-clash-game.component';

describe('ColorClashGameComponent', () => {
  let component: ColorClashGameComponent;
  let fixture: ComponentFixture<ColorClashGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorClashGameComponent, SharedTestingModule],
      providers: [ColorClashManagerService],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorClashGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate game items', () => {
    component.ngOnInit();
    expect(component.viewItems().length).toBe(3);
  });

  it('should start countdown', async () => {
    component.ngOnInit();

    component.warmUpRounds.set(3);
    component.buttonTap('1', '#0f7dff');

    await new Promise((res) => setTimeout(() => res(null), 1));

    const initialTime = component.timeBanner()!.nativeElement.innerHTML;

    component['startCountdown']();

    await new Promise((res) => setTimeout(() => res(null), 1001));

    expect(component.timeBanner()!.nativeElement.innerHTML).not.toBe(
      initialTime,
    );
    component.ngOnDestroy();
  });

  it('should set game finish', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(localStorage, 'setItem');
    component['setGameFinish']();
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should return for every id a meaning', () => {
    const items: ReadonlyArray<ColorClashItemId> = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'rect',
      'circle',
      'triangle',
    ];

    for (const id of items) {
      expect(component['getMeaning'](id).length).toBeGreaterThanOrEqual(1);
    }
  });
  it("should throw error when meaning didn't exists", () => {
    expect(() =>
      component['getMeaning']('unknown' as ColorClashItemId),
    ).toThrowError();
  });

  describe('Keyboard shortcuts', () => {
    it('should listen to shortcut keys and trigger buttonTap', () => {
      spyOn(component, 'buttonTap');
      const event = new KeyboardEvent('keydown', { key: 's' });
      document.dispatchEvent(event);
      expect(component.buttonTap).toHaveBeenCalled();
    });

    it('should not trigger buttonTap for non-shortcut keys', () => {
      spyOn(component, 'buttonTap');
      const event = new KeyboardEvent('keydown', { key: 'a' });
      document.dispatchEvent(event);
      expect(component.buttonTap).not.toHaveBeenCalled();
    });

    it('should map shortcut keys to correct button index', () => {
      const keyMap = { s: 0, d: 1, f: 2, j: 3, k: 4, l: 5 };
      spyOn(component, 'buttonTap');

      for (const key in keyMap) {
        const event = new KeyboardEvent('keydown', { key });
        document.dispatchEvent(event);
        expect(component.buttonTap).toHaveBeenCalledWith(
          component['gameButtons'][keyMap[key as 's']].id,
          component['gameButtons'][keyMap[key as 's']].color,
        );
      }
    });
  });
});
