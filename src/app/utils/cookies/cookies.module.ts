import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { QuicklinkDirective } from 'ngx-quicklink';
import { CookiesComponent } from './cookies.component';



@NgModule({
  declarations: [
    CookiesComponent
  ],
  exports: [
    CookiesComponent
  ],
  imports: [
    RouterLink,
    QuicklinkDirective,
    FormsModule,
  ]
})
export class WaioCookiesModule { }
