import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  inject
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { GAMES } from 'src/app/configs/games';
import { CardEffectsDirective } from 'src/app/directives/card-effects.directive';
import { ImagePreloaderService } from 'src/app/services/image-manager/image-preloader.service';
import { PageMetaData } from 'src/app/services/meta-manager/page-meta-data.interface';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-relax',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, QuicklinkModule, CardEffectsDirective],
  templateUrl: './relax.component.html',
  styleUrl: './relax.component.scss',
})
export class RelaxComponent extends ExtendedComponent {
  public games = GAMES;

  protected override pageMeta: PageMetaData = {
    title: $localize`Time to relax and play`,
    description: $localize`Let's play a mini-game to relax a bit!`,
  };
  /** Preload images with ServiceWorker */
  private imagePreloader = inject(ImagePreloaderService);

  constructor() {
    super();
    if (this.isBrowser) {
      afterNextRender(() => {
        // Preload the high resolution image which is required when
        // the user open the game.
        this.imagePreloader.preloadUrls(
          this.games.map((game) => {
            return `assets/img/game/${game.id}/${game.id}_4x`;
          }),
        );
      });
    }
  }

  override ngOnInit(): void {
    this.classList.add('page-padding');

    super.ngOnInit();
  }
}
