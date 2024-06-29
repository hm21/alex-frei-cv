import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GAMES } from 'src/app/configs/games';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { GAME } from '../../utils/game.token';
import { GameHeaderComponent } from './game-header.component';

describe('GameHeaderComponent', () => {
  let component: GameHeaderComponent;
  let fixture: ComponentFixture<GameHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameHeaderComponent, SharedTestingModule],
      providers: [
        {
          provide: GAME,
          useValue: GAMES[0],
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GameHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
