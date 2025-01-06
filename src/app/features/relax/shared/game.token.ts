import { InjectionToken } from '@angular/core';
import { Game } from '../interfaces/game.interface';

export const GAME = new InjectionToken<Game>('game');
