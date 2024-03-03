import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from 'src/test/shared-testing.module';
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

  it('should start countdown', fakeAsync(() => {
    component.ngOnInit();
    const initialTime = component.time();
    component['startCountdown']();
    fixture.detectChanges();
    tick(1001);
    expect(component.time()).not.toBe(initialTime);
    component.ngOnDestroy();
  }));

  it('should set game finish', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(localStorage, 'setItem');
    component['setGameFinish']();
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
