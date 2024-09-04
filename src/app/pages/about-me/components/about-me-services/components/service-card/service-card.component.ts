import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  TemplateRef,
  viewChild,
  ViewContainerRef
} from '@angular/core';
import { NgxScrollAnimationsDirective } from 'ngx-scroll-animations';
import { ExtendedComponent } from 'src/app/utils/extended-component';
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
  private iconRef = viewChild.required('iconRef', {
    read: ViewContainerRef,
  });

  /** Reference to the website icon template. */
  private websiteIcon = viewChild.required('websiteIcon', {
    read: TemplateRef<any>,
  });
  /** Reference to the apps icon template. */
  private appsIcon = viewChild.required('appsIcon', {
    read: TemplateRef<any>,
  });
  /** Reference to the design icon template. */
  private designIcon = viewChild.required('designIcon', {
    read: TemplateRef<any>,
  });
  /** Reference to the backend icon template. */
  private backendIcon = viewChild.required('backendIcon', {
    read: TemplateRef<any>,
  });

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
        this.iconRef().createEmbeddedView(this.websiteIcon());
        break;
      case 'app':
        this.iconRef().createEmbeddedView(this.appsIcon());
        break;
      case 'design':
        this.iconRef().createEmbeddedView(this.designIcon());
        break;
      case 'backend':
        this.iconRef().createEmbeddedView(this.backendIcon());
        break;

      default:
        throw new Error('Icon-Template is required!');
    }
  }
}
