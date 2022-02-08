import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/account/user-data.service';
import { UserService } from 'src/app/account/user.service';
import { AuthService } from 'src/app/auth/auth.service';
import { IUserDetails } from 'src/app/interfaces/IUserDetails';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  @Input() openNav!: Boolean;
  @Input() cUser!: IUserDetails;
  @Output() openSideNavFromChild= new EventEmitter();
  baseUrl = environment.baseUrl;
  

  constructor(private router: Router, private authservice: AuthService, private _userservice: UserService, private _userdata:UserDataService) { }

  ngOnInit(): void {
     
  }

  openFromChild(){
    this.openSideNavFromChild.emit();
  }
  signout(){
    this.authservice.logout();
  }

}



