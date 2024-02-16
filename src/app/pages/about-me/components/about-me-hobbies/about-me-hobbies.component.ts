import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NgxScrollAnimationsModule } from 'ngx-scroll-animations';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-about-me-hobbies',
  standalone: true,
  imports: [NgxScrollAnimationsModule, NgTemplateOutlet],
  templateUrl: './about-me-hobbies.component.html',
  styleUrl: './about-me-hobbies.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutMeHobbiesComponent
  extends ExtendedComponent
  implements OnInit
{
  @ViewChild('containerRef', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  @ViewChild('itemTemplate', { read: TemplateRef, static: true })
  itemTemplate!: TemplateRef<any>;

  public items = [
    {
      title: $localize`Hiking`,
      message: $localize`Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.`,
      icon: 'hiking',
    },
    {
      title: $localize`Travel`,
      message: $localize`Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.`,
      icon: 'travel',
    },
    {
      title: $localize`Develop`,
      message: $localize`Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.`,
      icon: 'develop',
    },
  ];

  override ngOnInit(): void {
    this.createItems();

    super.ngOnInit();
  }

  private createItems() {
    this.items.forEach((item) => {
      this.container.createEmbeddedView(this.itemTemplate, item);
    });
  }
}
