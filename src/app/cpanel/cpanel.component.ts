import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { UserService } from '../account/user.service';
import { IUserDetails } from '../interfaces/IUserDetails';


@Component({
  selector: 'app-cpanel',
  templateUrl: './cpanel.component.html',
  styleUrls: ['./cpanel.component.css']
})

export class CpanelComponent implements OnInit {

  baseUrl = environment.baseUrl;
  currentUser: IUserDetails ={
    fullName: '',
    userName: '',
    address: '',
    email: '',
    roles: [],
    phoneNumber: '',
    mobileNumber: '',
    gender: '',
    dateOfBirth: '',
    department: '',
    password: '',
    confirmPassword: '',
    profileImagePath: '',
    isActive: true,
  };

  constructor(public router: Router,private _userservice: UserService) { }
  openNav: boolean = true;
  ngOnInit(): void {
    var mytoken = this._userservice.getToken();
    var username = this._userservice.getUserByToken(mytoken) || 'sorry';
    this.getUserByUsername(username);
  }
  /* Set the width of the side navigation to 250px */
  toggleSideNav() {
    this.openNav = !this.openNav;
  }


  getUserByUsername(username:any){
    let testCurrentuser:any;
    this._userservice.getUserByUsername(username).subscribe({
      next: (data) => {
        testCurrentuser = data;
      },
      error: (err: Error) => {
        alert('Error:' + err);
      },
      complete: () => { 
        this.currentUser = testCurrentuser;
       
       
      }
     });
    }
    

  

}
