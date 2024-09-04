import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  signal,
  viewChild
} from '@angular/core';
import { NgxImageHeroDirective } from 'ngx-image-hero';
import { filter, fromEvent, timer } from 'rxjs';
import { modalAnimation } from 'src/app/animations/modal-animations';
import { ImageLoaderDirective } from 'src/app/directives/image-loader.directive';
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { Modal } from 'src/app/utils/modal/modal.component';
import {
  BadgeTemplateI,
  ProjectDetails,
  UrlListTemplateI,
} from '../../utils/portfolio-interfaces';

@Component({
  selector: 'af-project-details',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgClass,
    NgStyle,
    NgTemplateOutlet,
    NgxImageHeroDirective,
    SafePipe,
    ImageLoaderDirective,
  ],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss',
  animations: [modalAnimation],
})
export class ProjectDetailsComponent extends Modal<ProjectDetails> implements OnInit {
  /** Reference to the container for displaying website URLs. */
  private websiteContainer = viewChild.required('websiteContainer', {
    read: ViewContainerRef,
  });
  /** Reference to the container for displaying technology badges. */
  private technologyContainer = viewChild.required('technologyContainer', {
    read: ViewContainerRef,
  });
  /** Reference to the container for displaying video player. */
  private videoContainer = viewChild.required('videoContainer', {
    read: ViewContainerRef,
  });

  /** Reference to the badge template. */
  private badgeTemplate = viewChild.required('badgeTemplate', {
    read: TemplateRef<{ title: string; items: BadgeTemplateI[] }>,
  });
  /** Reference to the URL list template. */
  private urlListTemplate = viewChild.required('urlListTemplate', {
    read: TemplateRef<{ title: string; items: UrlListTemplateI[] }>,
  });
  /** Reference to the YouTube player template. */
  private youtubePlayer = viewChild.required('youtubePlayer', {
    read: TemplateRef<{ url: string }>,
  });


  /** Duration of modal animation for fade in. */
  public readonly modalAnimationDurationIn = signal(500);
  /** Duration of modal animation for fade out. */
  public readonly modalAnimationDurationOut = signal(300);
  /** Flag indicating if modal should fade out. */
  public modalFadeOut = signal(false);
  /** Flag indicating if video player is loaded. */
  public videoPlayerLoaded = signal(false);
  /** Flag indicating if install code is copied. */
  public copiedInstallCode = signal(false);
  /** Flag indicating if "Copied!" message should be shown. */
  public showCopiedMsg = signal(false);

  public openHero = signal(false);

  override ngOnInit(): void {
    this.createDetailInfos();
    this.initKeyListeners();

    super.ngOnInit();
  }

  /**
   * Creates the detail information for the project.
   * This method populates the website, store, video, and technology containers
   * with the corresponding data from the `data` object.
   */
  private createDetailInfos() {
    if (this.data().website) {
      this.websiteContainer().createEmbeddedView(this.urlListTemplate(), {
        title: $localize`Website`,
        items: this.data().website!.map((el) => {
          return {
            ...el,
            name: el.url,
          };
        }),
      });
    }
    if (this.data().store) {
      this.websiteContainer().createEmbeddedView(this.urlListTemplate(), {
        title: $localize`Mobile-Store`,
        items: this.data().store!.map((el) => {
          return {
            ...el,
            name: el.title,
          };
        }),
      });
    }

    if (this.data().video) {
      this.videoContainer().createEmbeddedView(this.youtubePlayer(), {
        url: this.data().video,
      });
    }

    if (this.data().technology) {
      Object.keys(this.data().technology).map((key) => {
        const title =
          key === 'frontend'
            ? $localize`Frontend`
            : key === 'backend'
              ? $localize`Backend`
              : key === 'prototype'
                ? $localize`Prototype`
                : key === 'other'
                  ? $localize`Other`
                  : null;
        if (!title) throw new Error(`Title for key '${key}' does not exists!`);

        this.technologyContainer().createEmbeddedView(this.badgeTemplate(), {
          title,
          items: this.data().technology[key as 'frontend'],
        });
      });
    }
  }

  /** Initializes key event listeners. */
  private initKeyListeners() {
    fromEvent<KeyboardEvent>(this.document, 'keydown')
      .pipe(
        this.destroyPipe(),
        filter(() => !this.openHero()),
      )
      .subscribe((event) => {
        if (event.key === 'Escape') {
          this.closeModal();
        }
      });
  }

  /** Closes the modal. */
  public closeModal() {
    this.modalFadeOut.set(true);

    timer(this.modalAnimationDurationOut())
      .pipe(this.destroyPipe())
      .subscribe(() => {
        this.close();
      });
  }

  /** Called when the video player is loaded. */
  public onVideoPlayerLoaded() {
    this.videoPlayerLoaded.set(true);
  }

  /**
   * Copies text to clipboard.
   * @param text Text to copy.
   */
  public async copy(text: string) {
    await navigator.clipboard.writeText(text);
    this.copiedInstallCode.set(true);
    this.showCopiedMsg.set(true);
    timer(2_000)
      .pipe(this.destroyPipe())
      .subscribe(() => {
        this.showCopiedMsg.set(false);
      });
  }
}
