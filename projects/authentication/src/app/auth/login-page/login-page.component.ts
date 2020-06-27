import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'ffr-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  animations: [
    trigger('loginTrigger', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(350px)' }),
        animate('1000ms 200ms ease-in-out', style({ opacity: 1, transform: 'none' }))
      ])
    ]),
    trigger('infoTrigger', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-1000px)' }),
        animate('1000ms ease-in-out', style({ opacity: 1, transform: 'none' }))
      ])
    ])
  ]
})
export class LoginPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
