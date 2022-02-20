import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { userRoleServices } from '../services/user-roles.service';
import 'jquery';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css']
})
export class UserRolesComponent implements OnInit {
  loader: boolean = false;
  allRoles!: any;
  testRoles: any;
  message!: string;

  constructor(public router: Router, private _roleservices: userRoleServices, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loader = true;
    this.listAllRoles();
  }

  listAllRoles(msg = null) {

    this._roleservices.getAllRoles().subscribe({
      next: (data) => {
        this.testRoles = data;
      },
      error: (err: Error) => {
        alert('Error:' + err);
      },
      complete: () => {
        this.allRoles = this.testRoles.roles;
        this.loader = false;
        (<any>$('.modal')).modal('hide');
      }
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

