import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NgxScrollAnimationsModule } from 'ngx-scroll-animations';
import { TypewriterComponent } from 'src/app/components/typewriter/typewriter.component';
import { HOBBIES } from 'src/app/configs/hobbies';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { Hobbies } from './utils/about-me-hobbies-interfaces';

@Component({
  selector: 'af-about-me-hobbies',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgxScrollAnimationsModule, NgTemplateOutlet, TypewriterComponent],
  templateUrl: './about-me-hobbies.component.html',
  styleUrl: './about-me-hobbies.component.scss',
})
export class AboutMeHobbiesComponent
  extends ExtendedComponent
  implements OnInit, OnDestroy
{
  @ViewChild('containerRef', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  @ViewChild('itemTemplate', { read: TemplateRef, static: true })
  itemTemplate!: TemplateRef<any>;

  /**
   * Represents a collection of hobbies.
   *
   * @remarks
   * Each item has a title, message, and icon.
   */
  public items: Hobbies[] = HOBBIES;

  override ngOnInit(): void {
    this.createItems();

    super.ngOnInit();
  }

  ngOnDestroy(): void {
    this.container.clear();
  }

  /**
   * Creates items by iterating over the array of items and creating embedded views using the provided item template.
   */
  private createItems() {
    this.items.forEach((item) => {
      this.container.createEmbeddedView(this.itemTemplate, item);
    });
  }
}
