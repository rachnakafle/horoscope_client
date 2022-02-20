import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { userRoleServices } from '../../services/user-roles.service';
import { appMessages } from 'src/app/messages.config';

@Component({
  selector: 'dialog-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent implements OnInit {

  submitted = false;
  submitted_success = false;
  submitted_msg: string = '';

  selectedRoleId: any;
  selectedRole: any;

  @Output("listAllRoles") listAllRoles: EventEmitter<any> = new EventEmitter();
  @Output("openSnackBar") openSnackBar: EventEmitter<any> = new EventEmitter();

  editRoleForm = new FormGroup({
    roleName: new FormControl('', [Validators.required]),
  });
  get roleName() {
    return this.editRoleForm.get('roleName');
  }

  constructor(private _roleservice: userRoleServices) { }

  ngOnInit(): void {
  }
  assignRole(id: any) {
    let sel_role: any;
    this.selectedRoleId = id;
    this._roleservice.getRoleById(id).subscribe({
      next: (x: any) => {
        sel_role = x.role;
      },
      error: (err: any) => {
        this.submitted_msg = appMessages.updateError
        
      },
      complete: () => {
        this.editRoleForm.setValue({
          roleName: sel_role.roleName
        });
      }
    });
  }
  editRole() {
    let roleName = this.editRoleForm.value.roleName;
    let data = {
      roleId: this.selectedRoleId,
      roleName: roleName
      }

    this._roleservice.update(this.selectedRoleId, data).subscribe({
      next: (x: any) => {
        this.submitted_msg = appMessages.updated;
        this.openSnackBar.emit({message:this.submitted_msg});
      },
      error: (err: any) => {
        this.submitted_msg =  appMessages.updateError;
        this.openSnackBar.emit({message:this.submitted_msg});
        this.listAllRoles.emit();
      },
      complete: () => {
        this.listAllRoles.emit();
      }
    });

  }

}
