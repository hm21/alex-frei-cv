import { Component, inject, OnInit, signal } from '@angular/core';
import { BackBtnComponent } from 'src/app/components/back-btn/back-btn.component';
import { GAME } from '../../utils/game.token';

@Component({
  selector: 'af-game-header',
  standalone: true,
  imports: [BackBtnComponent],
  templateUrl: './game-header.component.html',
  styleUrl: './game-header.component.scss',
})
export class GameHeaderComponent implements OnInit {
  public gameName = signal('');
  public fallbackPath = signal('');
  public imagePaths = signal<{ path: string; type: string }[]>([]);

  private game = inject(GAME);

  ngOnInit(): void {
    this.gameName.set(this.game.name);
    const rawPath = `assets/img/game/${this.game.id}/${this.game.id}_4x`;

    this.imagePaths().clear();
    ['avif', 'webp', 'jpeg'].forEach((format) => {
      this.imagePaths.update((el) => {
        el.push({
          type: `image/${format}`,
          path: `${rawPath}.${format}`,
        });
        return el;
      });
    });
    this.fallbackPath.set(`${rawPath}.jpeg`);
  }
}
