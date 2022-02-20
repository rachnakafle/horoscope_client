import { Component, Input, OnInit } from '@angular/core';
import { IUserDetails } from '../interfaces/IUserDetails';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { UserDataService } from './user-data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loader: boolean = false;
  baseUrl = environment.baseUrl;
  currentUser: IUserDetails = {
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

  constructor(private _userservice: UserService, public _router: Router) { }
  ngOnInit(): void {
    this.loader = true;
    var mytoken = this._userservice.getToken();
    var username = this._userservice.getUserByToken(mytoken) || 'sorry';
    this.getUserByUsername(username);

  }

  getUserByUsername(username: any) {
    let testCurrentuser: any;
    this._userservice.getUserByUsername(username).subscribe({
      next: (data) => {
        testCurrentuser = data;
      },
      error: (err: Error) => {
        alert('Error:' + err);
      },
      complete: () => {
        this.currentUser = testCurrentuser;
        this.loader = false;
      }
    });

  }






}
