import { Component, OnInit } from '@angular/core';
import { mainDataSource } from './mainnav.datasource';
import { userDataSource } from './usernav.datasource';

@Component({
  selector: 'sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  userRoles = localStorage.getItem('roles');
  
  datas: any[] = [];
  
  constructor() {
    
    
   }

  ngOnInit(): void {
    if(this.userRoles?.includes('Admin')){
      this.datas = mainDataSource;
    }
    else{
      this.datas = userDataSource;
    }
      
   }

}
