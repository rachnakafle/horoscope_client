import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { IUserDetails } from '../../interfaces/IUserDetails';
import { IRoles } from '../../interfaces/IRoles'

import { userManageServices } from '../services/user-manage.service';
import { environment } from 'src/environments/environment';
import 'jquery';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent implements OnInit {

  baseUrl = environment.baseUrl;
  page: number = 1;
  loader: boolean = true;
  allUsers: any;
  allRoleLists: IRoles[] = [];
  submitted: boolean = false;
  submitted_success: boolean = false;
  submitted_msg: string = '';

  constructor(
    public _router: Router,
    private _userservices: userManageServices,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.listAllRoles();
    this.listAllUsers();
  }

  listAllUsers() {
    let testCurrentuser: any;
    this.loader = true;
    this._userservices.getAllUsers().subscribe({
      next: (data) => {
        testCurrentuser = data;
      },
      error: (err: Error) => {
        alert('Error:' + err);
      },
      complete: () => {
        this.allUsers = testCurrentuser.users;
        this.loader = false;
        (<any>$('.modal')).modal('hide');
      },
    });
  }

  listAllRoles() {
    let allroles: any;
    this._userservices.getAllRoles().subscribe({
      next: (data) => {
        allroles = data;
        // console.log(allroles);
      },
      error: (err: Error) => {
        alert('Error:' + err);
      },
      complete: () => {
        allroles.roles.forEach((data: { roleName: any }) => {
          var i = 1;
          var RoleObject: IRoles = {
            rid: i++,
            name: data.roleName,
            isselected: false
          };
          this.allRoleLists.push(RoleObject);
        });
        //  console.log(this.allRoleLists);
      },
    });

  }


  openSnackBar($event:any) {
    this._snackBar.open($event.message, 'x', {
      duration: 4 * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }




}


