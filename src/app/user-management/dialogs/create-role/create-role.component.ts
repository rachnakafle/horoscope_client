import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { userRoleServices } from '../../services/user-roles.service';
import { appMessages } from 'src/app/messages.config';

@Component({
  selector: 'dialog-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {

  submitted_msg: string = '';
  @Output("listAllRoles") listAllRoles: EventEmitter<any> = new EventEmitter();
  @Output("openSnackBar") openSnackBar: EventEmitter<any> = new EventEmitter();

  constructor(private _roleservice: userRoleServices) { }
  createRoleForm = new FormGroup({
    roleName: new FormControl('', [Validators.required]),
  });

  get roleName() {
    return this.createRoleForm.get('roleName');
  }

  ngOnInit(): void {
  }

  createRole() {
    var roleName = this.createRoleForm.value.roleName;
    this._roleservice.create(roleName).subscribe({
      next: (x: any) => {
        this.submitted_msg = appMessages.roleCreated;
        this.openSnackBar.emit({message:this.submitted_msg});
      },
      error: (err: any) => {
        this.submitted_msg = appMessages.signCreateError;
        this.openSnackBar.emit({message:this.submitted_msg});
        this.listAllRoles.emit();
      },
      complete: () => {
        this.listAllRoles.emit();
      }
    });

  }

}
