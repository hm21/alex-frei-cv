import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'src/app/services/cookie.service';
import { HeaderService } from 'src/app/services/header.service';


@Component({
  selector: 'waio-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss'],
  animations: [
    trigger('fadeOut', [
      transition(
        ':leave',
        [
          animate('{{duration}} ease',
            style({ opacity: 0 }))
        ], { params: { duration: '300ms' } }
      )
    ]),
    trigger('alert', [
      transition(
        ':enter',
        [
          style({
            opacity: .5,
            transform: 'translateY(-50px)'
          }),
          animate('{{duration}} ease',
            style({ opacity: 1, transform: 'translateY(0px)' }))
        ], { params: { duration: '500ms' } }
      ),
      transition(
        ':leave',
        [
          animate('{{duration}} ease',
            style({ opacity: 0, transform: 'translateY(50px)' }))
        ], { params: { duration: '500ms' } }
      )
    ]),
  ]
})
export class CookiesComponent implements OnInit, OnDestroy {

  constructor(
    @Inject('isBrowser') private isBrowser: boolean,
    public manager: HeaderService,
    public cookies: CookieService,
  ) { }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.cookies.init();
    }
  }

  ngOnDestroy(): void {
    this.cookies.destroy$.next(null);
    this.cookies.destroy$.complete();
  }
}
