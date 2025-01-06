import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import { NgxScrollAnimationsDirective } from 'ngx-scroll-animations';
import { ExtendedComponent } from 'src/app/shared/components/extended-component';
import { SERVICES } from 'src/app/shared/constants/services.constants';
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { ServiceCard } from './interfaces/service-card.interface';

@Component({
  selector: 'af-about-me-services',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ServiceCardComponent, NgxScrollAnimationsDirective],
  templateUrl: './about-me-services.component.html',
  styleUrl: './about-me-services.component.scss',
})
export class AboutMeServicesComponent extends ExtendedComponent {
  /** Array of service card data to be displayed. */
  public readonly items: ServiceCard[] = SERVICES;
}
