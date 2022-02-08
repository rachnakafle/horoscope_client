import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  openNav: boolean = true;

  constructor(public router: Router) {}

  /* Set the width of the side navigation to 250px */
  toggleSideNav() {
    this.openNav = !this.openNav;
  }
}
