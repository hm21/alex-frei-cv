import { InjectionToken } from '@angular/core';
import { Game } from './game-model';

export const GAME = new InjectionToken<Game>('game');
