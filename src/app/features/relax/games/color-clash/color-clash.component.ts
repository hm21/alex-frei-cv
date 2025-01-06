import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { PageMetaData } from 'src/app/core/services/meta-manager/page-meta-data.interface';
import { ExtendedComponent } from 'src/app/shared/components/extended-component';
import { GAMES } from 'src/app/shared/constants/games.constants';
import { gameScreenAnimation } from '../../animations/game-card.animation';
import { GameHeaderComponent } from '../../components/game-header/game-header.component';
import { GAME } from '../../shared/game.token';
import { ColorClashManagerService } from './services/color-clash-manager.service';

@Component({
  selector: 'af-color-clash',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,

    GameHeaderComponent,
  ],
  providers: [
    {
      provide: GAME,
      useValue: GAMES.find((el) => el.id === 'color-clash')!,
    },
  ],
  animations: [gameScreenAnimation],
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

  /** Angular context for children outlets. */
  private contexts = inject(ChildrenOutletContexts);
  private gameManager = inject(ColorClashManagerService);

  ngOnDestroy(): void {
    this.gameManager.destroy();
  }

  /**
   * Retrieves animation data for route transitions.
   * @returns Animation data for route transitions.
   */
  public getRouteAnimationData() {
    return this.contexts.getContext('state')?.route?.snapshot?.data.animation;
  }
}
