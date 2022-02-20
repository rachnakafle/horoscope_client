import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { userRoleServices } from '../../services/user-roles.service';
import { appMessages } from 'src/app/messages.config';

@Component({
  selector: 'dialog-delete-role',
  templateUrl: './delete-role.component.html',
  styleUrls: ['./delete-role.component.css']
})
export class DeleteRoleComponent implements OnInit {
  selectedId: any;
  submitted_msg!: string;
  @Output("listAllRoles") listAllRoles: EventEmitter<any> = new EventEmitter();
  @Output("openSnackBar") openSnackBar: EventEmitter<any> = new EventEmitter();

  constructor(private _role: userRoleServices) { }

  ngOnInit(): void { }
  assignRole(id: any) {
    this.selectedId = id;
  }
  confirmDelete() {
    this._role.delete(this.selectedId).subscribe({
      next: (x: any) => {
        this.submitted_msg = appMessages.deleted;
        this.openSnackBar.emit({message:this.submitted_msg});
      },
      error: (e: any) => {
        this.submitted_msg = appMessages.deleteError;      
        this.openSnackBar.emit({message:this.submitted_msg});
      },
      complete: () => { 
        this.listAllRoles.emit();
       }
    });
  }
}
