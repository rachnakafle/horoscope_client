import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';

@Component({
  selector: 'dash-item',
  templateUrl: './dash-item.component.html',
  styleUrls: ['./dash-item.component.css']
})
export class DashItemComponent implements OnInit {
  

  @Input()  itemTitle: string = '';
 
  constructor() { }
  
  ngOnInit(): void {
  }

}
