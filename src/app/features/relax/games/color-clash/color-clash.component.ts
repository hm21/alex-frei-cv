import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GAMES } from 'src/app/core/constants/games.constants';
import { PageMetaData } from 'src/app/core/services/meta-manager/page-meta-data.interface';
import { ExtendedComponent } from 'src/app/shared/components/extended-component';
import { GameHeaderComponent } from '../../components/game-header/game-header.component';
import { GAME } from '../../shared/game.token';
import { ColorClashManagerService } from './services/color-clash-manager.service';

@Component({
  selector: 'af-color-clash',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, GameHeaderComponent],
  providers: [
    {
      provide: GAME,
      useValue: GAMES.find((el) => el.id === 'color-clash')!,
    },
  ],
  templateUrl: './color-clash.component.html',
  styleUrls: [
    '../../styles/game-styles.scss',
    '../../styles/game-card.scss',
    '../../styles/game-button.scss',
    './color-clash.component.scss',
  ],
})
export class ColorClashComponent
  extends ExtendedComponent
  implements OnDestroy
{
  /**
   * The metadata for the page.
   */
  protected override pageMeta: PageMetaData = {
    title: $localize`Color Clash Game`,
    description: $localize`Attempt to keep your mind under control without getting confused.`,
  };

  private gameManager = inject(ColorClashManagerService);

  ngOnDestroy(): void {
    this.gameManager.destroy();
  }
}
