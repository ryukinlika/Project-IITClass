import { Component, OnInit } from '@angular/core';
import { style, transition, animate, trigger } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fade', [
      transition('void=>*', [
        style({ opacity: 0 }),
        animate(2000)
      ])
    ])

  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
