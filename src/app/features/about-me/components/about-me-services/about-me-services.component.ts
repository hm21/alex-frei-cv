import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxScrollAnimationsDirective } from 'ngx-scroll-animations';
import { SERVICES } from 'src/app/core/constants/services.constants';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { ExtendedComponent } from 'src/app/shared/components/extended-component';
import { ServiceIconPipe } from './pipes/service-icon.pipe';
import { ServiceCard } from './types/service-card-type';

@Component({
  selector: 'af-about-me-services',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgxScrollAnimationsDirective, CardComponent, ServiceIconPipe],
  templateUrl: './about-me-services.component.html',
  styleUrl: './about-me-services.component.scss',
})
export class AboutMeServicesComponent extends ExtendedComponent {
  /** Array of service card data to be displayed. */
  public readonly items: ReadonlyArray<ServiceCard> = SERVICES;
}
