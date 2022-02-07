import { Component, OnInit } from '@angular/core';
import { mainDataSource } from './mainnav.datasource';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  datas: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.datas = mainDataSource;
  }

}
