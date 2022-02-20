import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'stat-item',
  templateUrl: './stat-item.component.html',
  styleUrls: ['./stat-item.component.css']
})
export class StatItemComponent implements OnInit {

  @Input() itemTitle: String = '';
  @Input() itemCount: String = '';
  @Input() itemColor: String = '';
  @Input() itemIcon: String = '';

  constructor() { }

  ngOnInit(): void {
  }

}
