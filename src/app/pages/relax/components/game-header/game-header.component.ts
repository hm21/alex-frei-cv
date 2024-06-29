import { Component, inject } from '@angular/core';
import { BackBtnComponent } from 'src/app/components/back-btn/back-btn.component';
import { GAME } from '../../utils/game.token';

@Component({
  selector: 'af-game-header',
  standalone: true,
  imports: [BackBtnComponent],
  templateUrl: './game-header.component.html',
  styleUrl: './game-header.component.scss',
})
export class GameHeaderComponent {
  public gameName = '';
  public fallbackPath = '';
  public imagePaths: { path: string; type: string }[] = [];

  private game = inject(GAME);

  ngOnInit(): void {
    this.gameName = this.game.name;
    const rawPath = `assets/img/game/${this.game.id}/${this.game.id}_4x`;

    this.imagePaths.clear();
    ['avif', 'webp', 'jpeg'].forEach((format) => {
      this.imagePaths.push({
        type: `image/${format}`,
        path: `${rawPath}.${format}`,
      });
    });
    this.fallbackPath = `${rawPath}.jpeg`;
  }
}
