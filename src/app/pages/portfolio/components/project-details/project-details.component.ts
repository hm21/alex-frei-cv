import { DOCUMENT, NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { NgxImageHeroModule } from 'ngx-image-hero';
import { fromEvent, timer } from 'rxjs';
import { modalAnimation } from 'src/app/animations/modal-animations';
import { ModalManagerService } from 'src/app/services/modal-manager.service';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-project-details',
  standalone: true,
  imports: [NgClass, NgStyle, NgTemplateOutlet, NgxImageHeroModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss',
  animations: [modalAnimation],
})
export class ProjectDetailsComponent
  extends ExtendedComponent
  implements OnInit
{
  @ViewChild('websiteContainer', { read: ViewContainerRef, static: true })
  websiteContainer!: ViewContainerRef;
  @ViewChild('technologyContainer', { read: ViewContainerRef, static: true })
  technologyContainer!: ViewContainerRef;
  @ViewChild('videoContainer', { read: ViewContainerRef, static: true })
  videoContainer!: ViewContainerRef;

  @ViewChild('badgeTemplate', { read: TemplateRef, static: true })
  badgeTemplate!: TemplateRef<{ title: string; items: BadgeTemplateI[] }>;
  @ViewChild('urlListTemplate', { read: TemplateRef, static: true })
  urlListTemplate!: TemplateRef<{ title: string; items: UrlListTemplateI[] }>;
  @ViewChild('youtubePlayer', { read: TemplateRef, static: true })
  youtubePlayer!: TemplateRef<{ url: string }>;

  public modalAnimationDurationIn = 500;
  public modalAnimationDurationOut = 300;
  public modalFadeOut = false;
  public videoPlayerLoaded = false;
  public copiedInstallCode = false;
  public showCopiedMsg = false;

  private modalManager = inject(ModalManagerService);
  private document = inject(DOCUMENT);

  override ngOnInit(): void {
    if (this.data.website) {
      this.websiteContainer.createEmbeddedView(this.urlListTemplate, {
        title: $localize`Website`,
        items: this.data.website.map((el) => {
          return {
            ...el,
            name: el.url,
          };
        }),
      });
    }
    if (this.data.store) {
      this.websiteContainer.createEmbeddedView(this.urlListTemplate, {
        title: $localize`Mobile-Store`,
        items: this.data.store.map((el) => {
          return {
            ...el,
            name: el.title,
          };
        }),
      });
    }

    if (this.data.video) {
      this.videoContainer.createEmbeddedView(this.youtubePlayer, {
        url: this.data.video,
      });
    }

    if (this.data.technology) {
      Object.keys(this.data.technology).map((key) => {
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

        this.technologyContainer.createEmbeddedView(this.badgeTemplate, {
          title,
          items: this.data.technology[key as 'frontend'],
        });
      });
    }

    this.initKeyListeners();

    super.ngOnInit();
  }

  private initKeyListeners() {
    fromEvent<KeyboardEvent>(this.document, 'keydown')
      .pipe(this.destroyPipe())
      .subscribe((event) => {
        if (event.key === 'Escape') {
          this.closeModal();
        }
      });
  }

  public closeModal() {
    this.modalFadeOut = true;

    timer(this.modalAnimationDurationOut)
      .pipe(this.destroyPipe())
      .subscribe(() => {
        this.modalManager.closeModal();
      });
  }

  public onVideoPlayerLoaded() {
    this.videoPlayerLoaded = true;
  }

  public async copy(text: string) {
    await navigator.clipboard.writeText(text);
    this.copiedInstallCode = true;
    this.showCopiedMsg = true;
    timer(2_000)
      .pipe(this.destroyPipe())
      .subscribe(() => {
        this.showCopiedMsg = false;
      });
  }

  public get data(): ProjectDetails {
    return this.modalManager.modalData;
  }
}

export interface ProjectDetails {
  logo?: SafeHtml;
  title: string;
  subtitle: string;
  description: string;
  demoUrl?: string;
  website?: UrlListTemplateI[];
  store?: UrlListTemplateI[];
  install?: string;
  technology: {
    frontend?: BadgeTemplateI[];
    backend?: BadgeTemplateI[];
    prototype?: BadgeTemplateI[];
    other?: BadgeTemplateI[];
  };
  images: {
    path: string;
    alt: string;
    ratio?: string;
    backgroundColor?: string;
    isGif?: boolean;
  }[];
  video?: SafeResourceUrl;
}

interface BadgeTemplateI {
  name: string;
}

interface UrlListTemplateI {
  url: string;
  title: string;
  name?: string;
}
