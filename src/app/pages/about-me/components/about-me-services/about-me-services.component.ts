import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NgxScrollAnimationsModule } from 'ngx-scroll-animations';
import { services } from 'src/app/configs/services';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { ServiceCard } from './model/service-card-interface';

@Component({
  selector: 'af-about-me-services',
  standalone: true,
  imports: [ServiceCardComponent, NgxScrollAnimationsModule],
  templateUrl: './about-me-services.component.html',
  styleUrl: './about-me-services.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutMeServicesComponent
  extends ExtendedComponent
  implements OnInit, OnDestroy
{
  /** Reference to the container where service items will be created dynamically. */
  @ViewChild('serviceItemsRef', { read: ViewContainerRef, static: true })
  serviceItemsRef!: ViewContainerRef;

  /** Array of service card data to be displayed. */
  private items: ServiceCard[] = services;

  override ngOnInit(): void {
    this.items.forEach((el) => {
      this.createService(el);
    });

    super.ngOnInit();
  }

  ngOnDestroy(): void {
    this.serviceItemsRef.clear();
  }

  /**
   * Dynamically creates a service card component with the provided data.
   * @param data Service card data to be displayed.
   */
  private createService(data: ServiceCard) {
    const componentRef =
      this.serviceItemsRef.createComponent(ServiceCardComponent);

    componentRef.instance.title = data.title;
    componentRef.instance.msg = data.msg;
    componentRef.instance.icon = data.icon;
  }
}
