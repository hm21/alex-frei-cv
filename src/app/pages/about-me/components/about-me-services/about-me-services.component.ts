import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NgxScrollAnimationsModule } from 'ngx-scroll-animations';
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
  implements OnInit
{
  @ViewChild('serviceItemsRef', { read: ViewContainerRef, static: true })
  serviceItemsRef!: ViewContainerRef;

  private items: ServiceCard[] = [
    {
      title: $localize`Websites`,
      msg: $localize`
        As a dedicated web developer, I specialize in crafting visually stunning and fully functional websites. 
        Whether you're looking to establish your online presence or enhance your existing site, I ensure top-notch quality and user satisfaction.
      `,
      icon: 'website',
    },
    {
      title: $localize`Apps`,
      msg: $localize`
        With my expertise in mobile and web app development, I create innovative solutions tailored to your needs. 
        From concept to launch, I prioritize usability and performance, delivering apps that stand out in today's competitive market.
      `,
      icon: 'app',
    },
    {
      title: $localize`Design`,
      msg: $localize`
        Design is my passion, and I bring creativity and flair to every project. 
        I specialize in crafting visually captivating designs that reflect your brand identity and leave a lasting impression on your audience.
      `,
      icon: 'design',
    },
    {
      title: $localize`Backend`,
      msg: $localize`
        As a backend developer, I architect robust and scalable systems to power your applications. 
        From database design to server-side logic, I ensure seamless functionality and reliability, allowing you to focus on growing your business.
      `,
      icon: 'backend',
    },
  ];

  override ngOnInit(): void {
    this.items.forEach((el) => {
      this.createService(el);
    });

    super.ngOnInit();
  }

  private createService(data: ServiceCard) {
    const componentRef =
      this.serviceItemsRef.createComponent(ServiceCardComponent);

    componentRef.instance.title = data.title;
    componentRef.instance.msg = data.msg;
    componentRef.instance.icon = data.icon;
  }
}
