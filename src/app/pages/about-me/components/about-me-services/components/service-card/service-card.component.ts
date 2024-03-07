import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NgxScrollAnimationsModule } from 'ngx-scroll-animations';
import { ExtendedComponent } from 'src/app/utils/extended-component';
import { ServiceCardIcon } from '../../model/service-card-type';

@Component({
  selector: 'af-service-card',
  standalone: true,
  imports: [NgxScrollAnimationsModule],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCardComponent extends ExtendedComponent implements OnInit {
  /** Reference to the container where service items will be created dynamically. */
  @ViewChild('serviceItemsRef', { read: ViewContainerRef, static: true })
  serviceItemsRef!: ViewContainerRef;
  /** Reference to the container for displaying icons. */
  @ViewChild('iconRef', { read: ViewContainerRef, static: true })
  iconRef!: ViewContainerRef;

  /** Reference to the website icon template. */
  @ViewChild('websiteIcon', { read: TemplateRef, static: true })
  private websiteIcon!: TemplateRef<any>;
  /** Reference to the apps icon template. */
  @ViewChild('appsIcon', { read: TemplateRef, static: true })
  private appsIcon!: TemplateRef<any>;
  /** Reference to the design icon template. */
  @ViewChild('designIcon', { read: TemplateRef, static: true })
  private designIcon!: TemplateRef<any>;
  /** Reference to the backend icon template. */
  @ViewChild('backendIcon', { read: TemplateRef, static: true })
  private backendIcon!: TemplateRef<any>;

  /** Title of the service. */
  @Input({ required: true }) title!: string;
  /** Description message of the service. */
  @Input({ required: true }) msg!: string;
  /** Icon representing the service. */
  @Input({ required: true }) icon!: ServiceCardIcon;

  override ngOnInit(): void {
    this.setIconTemplate();

    super.ngOnInit();
  }

  /**
   * Sets the icon template based on the value of the `icon` property.
   * The icon template is created by embedding the corresponding view based on the `icon` value.
   * Supported icon values are: 'website', 'app', 'design', 'backend'.
   * Throws an error if the `icon` value is not one of the supported values.
   */
  private setIconTemplate() {
    switch (this.icon) {
      case 'website':
        this.iconRef.createEmbeddedView(this.websiteIcon);
        break;
      case 'app':
        this.iconRef.createEmbeddedView(this.appsIcon);
        break;
      case 'design':
        this.iconRef.createEmbeddedView(this.designIcon);
        break;
      case 'backend':
        this.iconRef.createEmbeddedView(this.backendIcon);
        break;

      default:
        throw new Error('Icon-Template is required!');
    }
  }
}
