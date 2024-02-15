import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxImageHeroModule } from 'ngx-image-hero';
import { QuicklinkModule } from 'ngx-quicklink';
import { ExtendedComponent } from 'src/app/utils/extended-component';

@Component({
  selector: 'af-profile-banner',
  standalone: true,
  imports: [RouterLink, QuicklinkModule, NgxImageHeroModule],
  templateUrl: './profile-banner.component.html',
  styleUrl: './profile-banner.component.scss',
})
export class ProfileBannerComponent extends ExtendedComponent {}
