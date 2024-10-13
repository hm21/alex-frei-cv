import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  OnInit,
  viewChild
} from '@angular/core';
import { NgxScrollAnimationsDirective } from 'ngx-scroll-animations';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import svgApps from 'src/assets/img/icon/apps.svg';
import svgBackend from 'src/assets/img/icon/backend.svg';
import svgDesign from 'src/assets/img/icon/design.svg';
import svgWebsite from 'src/assets/img/icon/website.svg';
import { ServiceCardIcon } from '../../model/service-card-type';

@Component({
  selector: 'af-service-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgxScrollAnimationsDirective],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.scss',
})
export class ServiceCardComponent extends ExtendedComponent implements OnInit {
  /** Reference to the container for displaying icons. */
  private iconRef = viewChild.required<ElementRef<HTMLElement>>('iconRef');

  /** Icon representing the service. */
  public icon = input.required<ServiceCardIcon>();

  override ngOnInit(): void {
    this.setIconTemplate();

    super.ngOnInit();
  }

  /**
   * Sets the icon template based on the value of the `icon` property.
   *
   * The icon template is created by embedding the corresponding view based on the `icon` value.
   *
   * Supported icon values are: `website`, `app`, `design` and `backend`.
   *
   * Throws an error if the `icon` value is not one of the supported values.
   */
  private setIconTemplate() {
    switch (this.icon()) {
      case 'website':
        this.iconRef().nativeElement.innerHTML = svgWebsite;
        break;
      case 'app':
        this.iconRef().nativeElement.innerHTML = svgApps;
        break;
      case 'design':
        this.iconRef().nativeElement.innerHTML = svgDesign;
        break;
      case 'backend':
        this.iconRef().nativeElement.innerHTML = svgBackend;
        break;

      default:
        throw new Error('Icon-Template is required!');
    }
  }
}
