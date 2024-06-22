import { Component, Input } from '@angular/core';
import { BackBtnComponent } from 'src/app/components/back-btn/back-btn.component';
import { Game } from '../../utils/game-model';

@Component({
  selector: 'af-game-header',
  standalone: true,
  imports: [BackBtnComponent],
  templateUrl: './game-header.component.html',
  styleUrl: './game-header.component.scss',
})
export class GameHeaderComponent {
  @Input({ required: true }) set game(game: Game) {
    this.gameName = game.name;
    const rawPath = `assets/img/game/${game.id}/${game.id}_4x`;

    this.imagePaths.clear();
    ['avif', 'webp', 'jpeg'].forEach((format) => {
      this.imagePaths.push({
        type: `image/${format}`,
        path: `${rawPath}.${format}`,
      });
    });
    this.fallbackPath = `${rawPath}.jpeg`;
  }

  public gameName = '';
  public fallbackPath = '';
  public imagePaths: { path: string; type: string }[] = [];
}
