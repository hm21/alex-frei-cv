import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { NgxImageHeroDirective } from 'ngx-image-hero';
import { distinctUntilChanged, fromEvent, map } from 'rxjs';
import { modalAnimation } from 'src/app/shared/animations/modal-animations';
import { ProgressSpinnerComponent } from 'src/app/shared/components/progress-spinner/progress-spinner.component';
import { ImageLoaderDirective } from 'src/app/shared/directives/image-loader/image-loader.directive';
import { SafePipe } from 'src/app/shared/pipes/safe.pipe';
import { ModalHeaderComponent } from 'src/app/ui/modal/components/modal-header/modal-header.component';
import { Modal } from 'src/app/ui/modal/modal.base';
import { ToastService } from 'src/app/ui/toast/services/toast.service';
import svgIconCopy from 'src/assets/img/icon/copy.svg';
import svgIconGlobe from 'src/assets/img/icon/globe.svg';
import {
  ProjectDetails,
  UrlListTemplateI,
} from '../../interfaces/portfolio.interfaces';

@Component({
  selector: 'af-project-details',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    NgxImageHeroDirective,
    SafePipe,
    ImageLoaderDirective,
    ProgressSpinnerComponent,
    ModalHeaderComponent,
  ],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss',
  animations: [modalAnimation],
  host: {
    '[class.open-hero]': 'isHeroActive()',
    '[@modal]': `{
      value: this.modalFadeOut() ? 'out' : 'in',
      params: {
        durationIn: this.modalAnimationDurationIn(),
        durationOut: this.modalAnimationDurationOut(),
      },
    }`,
  },
})
export class ProjectDetailsComponent
  extends Modal<ProjectDetails>
  implements OnInit
{
  protected readonly iconCopy = svgIconCopy;
  protected readonly iconGlobe = svgIconGlobe;

  private toast = inject(ToastService);

  /** Reference to the container for displaying website URLs. */
  private websiteContainer = viewChild.required('websiteContainer', {
    read: ViewContainerRef,
  });
  /** Reference to the container for displaying technology chips. */
  private technologyContainer = viewChild.required('technologyContainer', {
    read: ViewContainerRef,
  });
  /** Reference to the container for displaying video player. */
  private videoContainer = viewChild.required('videoContainer', {
    read: ViewContainerRef,
  });

  private sectionRef =
    viewChild.required<ElementRef<HTMLElement>>('sectionRef');

  private headerRef = viewChild.required(ModalHeaderComponent, {
    read: ElementRef<HTMLElement>,
  });

  /** Reference to the chip template. */
  private chipTemplate = viewChild.required('chipTemplate', {
    read: TemplateRef<{ title: string; items: string[] }>,
  });
  /** Reference to the URL list template. */
  private urlListTemplate = viewChild.required('urlListTemplate', {
    read: TemplateRef<{ title: string; items: UrlListTemplateI[] }>,
  });
  /** Reference to the YouTube player template. */
  private youtubePlayer = viewChild.required('youtubePlayer', {
    read: TemplateRef<{ url: string }>,
  });

  /** Flag indicating if video player is loaded. */
  public videoPlayerLoaded = signal(false);

  override ngOnInit(): void {
    this.createDetailInfos();
    this.listenScrollAnimation();

    super.ngOnInit();
  }
  /**
   * Attaches a scroll event listener to the section's native element and applies a box-shadow
   * to the header's native element when the scroll position is greater than 3 pixels.
   *
   * The function listens to the scroll event using RxJS's `fromEvent` and transforms the scroll
   * event into a boolean value indicating whether the scroll position is greater than 3 pixels.
   * It then uses `distinctUntilChanged()` to ensure that the box-shadow is applied or removed
   * only when the scroll position changes between above and below the threshold.
   *
   * - If the scroll position is greater than 3 pixels, a box-shadow is applied to the header.
   * - If the scroll position is less than or equal to 3 pixels, the box-shadow is removed.
   * @private
   * @returns {void}
   */
  private listenScrollAnimation(): void {
    fromEvent(this.sectionRef().nativeElement, 'scroll')
      .pipe(
        map(() => {
          const el = this.sectionRef().nativeElement;

          return el.scrollTop > 3;
        }),
        distinctUntilChanged(),
      )
      .subscribe((show) => {
        if (show) {
          this.headerRef().nativeElement.style.boxShadow =
            '0 4px 6px rgba(0, 0, 0, 0.1)';
        } else {
          this.headerRef().nativeElement.style.removeProperty('box-shadow');
        }
      });
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

        this.technologyContainer().createEmbeddedView(this.chipTemplate(), {
          title,
          items: this.data().technology[key as 'frontend'],
        });
      });
    }
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
    this.toast.success($localize`Copied`);
  }
}
