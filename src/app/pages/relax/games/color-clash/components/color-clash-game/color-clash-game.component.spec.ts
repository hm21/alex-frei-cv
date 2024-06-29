import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { ColorClashManagerService } from '../../utils/color-clash-manager.service';
import { ColorClashGameComponent } from './color-clash-game.component';

describe('ColorClashGameComponent', () => {
  let component: ColorClashGameComponent;
  let fixture: ComponentFixture<ColorClashGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ColorClashGameComponent,
        BrowserAnimationsModule,
        SharedTestingModule,
      ],
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

    const initialTime = component.timeBanner.nativeElement.innerHTML;

    component['startCountdown']();

    await new Promise((res) => setTimeout(() => res(null), 1001));

    expect(component.timeBanner.nativeElement.innerHTML).not.toBe(initialTime);
    component.ngOnDestroy();
  });

  it('should set game finish', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(localStorage, 'setItem');
    component['setGameFinish']();
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
