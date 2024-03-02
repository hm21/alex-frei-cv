import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { NgxScrollAnimationsModule } from 'ngx-scroll-animations';
import { NavItemId, navItems } from 'src/app/layout/header/utils/nav-items';
import {
  aboutMeIcon,
  portfolioIcon,
  relaxIcon,
  resumeIcon,
} from 'src/app/layout/header/utils/raw-icons';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-recommended-pages',
  standalone: true,
  imports: [QuicklinkModule, RouterLink, NgxScrollAnimationsModule],
  templateUrl: './recommended-pages.component.html',
  styleUrl: './recommended-pages.component.scss',
})
export class RecommendedPagesComponent
  extends ExtendedComponent
  implements OnInit, OnDestroy
{
  @ViewChild('containerRef', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  @ViewChild('itemTemplate', { read: TemplateRef, static: true })
  itemTemplate!: TemplateRef<any>;

  @Input({ required: true }) activeId!: NavItemId;

  public items = [];

  private sanitizer = inject(DomSanitizer);

  override ngOnInit(): void {
    this.createItems();

    super.ngOnInit();
  }

  ngOnDestroy(): void {
    this.container.clear();
  }

  private createItems() {
    const listBefore: any[] = [];
    const listAfter: any[] = [];
    const activeIndex = navItems.findIndex((e) => e.id === this.activeId);

    navItems
      .filter((el) => el.id !== 'contact' && el.id !== this.activeId)
      .map((el) => {
        switch (el.id) {
          case 'aboutMe':
            el.icon = this.sanitizer.bypassSecurityTrustHtml(aboutMeIcon);
            break;
          case 'resume':
            el.icon = this.sanitizer.bypassSecurityTrustHtml(resumeIcon);
            break;
          case 'portfolio':
            el.icon = this.sanitizer.bypassSecurityTrustHtml(portfolioIcon);
            break;
          case 'relax':
            el.icon = this.sanitizer.bypassSecurityTrustHtml(relaxIcon);
            break;
        }
        return el;
      })
      .forEach((el) => {
        if (navItems.findIndex((e) => e.id === el.id) > activeIndex) {
          listAfter.push(el);
        } else {
          listBefore.push(el);
        }
      });
    [...listAfter, ...listBefore].forEach((item) => {
      this.container.createEmbeddedView(this.itemTemplate, item);
    });
  }
}
