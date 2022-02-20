import { Injectable } from '@angular/core';
import { IUserDetails } from '../interfaces/IUserDetails';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

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
  constructor(private _userservice: UserService) {}

  getUserByUsername(username:any):IUserDetails{
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
        console.log(this.currentUser);
        return this.currentUser;
      }
     });
     return this.currentUser;
  }
}
