import {
    ChangeDetectionStrategy,
    Component,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { NgxScrollAnimationsDirective } from 'ngx-scroll-animations';
import { SERVICES } from 'src/app/configs/services';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { ServiceCard } from './model/service-card-interface';

@Component({
  selector: 'af-about-me-services',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ServiceCardComponent, NgxScrollAnimationsDirective],
  templateUrl: './about-me-services.component.html',
  styleUrl: './about-me-services.component.scss',
})
export class AboutMeServicesComponent extends ExtendedComponent {
  /** Reference to the container where service items will be created dynamically. */
  @ViewChild('serviceItemsRef', { read: ViewContainerRef, static: true })
  serviceItemsRef!: ViewContainerRef;

  /** Array of service card data to be displayed. */
  public items: ServiceCard[] = SERVICES;
}
