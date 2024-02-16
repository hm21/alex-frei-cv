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
  @ViewChild('iconRef', { read: ViewContainerRef, static: true })
  iconRef!: ViewContainerRef;

  @ViewChild('websiteIcon', { read: TemplateRef, static: true })
  private websiteIcon!: TemplateRef<any>;
  @ViewChild('appsIcon', { read: TemplateRef, static: true })
  private appsIcon!: TemplateRef<any>;
  @ViewChild('designIcon', { read: TemplateRef, static: true })
  private designIcon!: TemplateRef<any>;
  @ViewChild('backendIcon', { read: TemplateRef, static: true })
  private backendIcon!: TemplateRef<any>;

  @Input({ required: true }) title!: string;
  @Input({ required: true }) msg!: string;
  @Input({ required: true }) icon!: ServiceCardIcon;

  override ngOnInit(): void {
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

    super.ngOnInit();
  }
}
