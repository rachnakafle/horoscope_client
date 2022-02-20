import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { userManageServices } from '../../services/user-manage.service';
import 'jquery';
import { appMessages } from 'src/app/messages.config';

@Component({
  selector: 'dialog-reset-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  selectedId!:string;

  submitted = false;
  submitted_success = false;
  submitted_msg:string = '';
  @Output("openSnackBar") openSnackBar: EventEmitter<any> = new EventEmitter();

  resetPasswordForm = new FormGroup({
    rpassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rconfirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  get rpassword(){
    return this.resetPasswordForm.get('rpassword');
  }
  get rconfirmPassword(){
    return this.resetPasswordForm.get('rconfirmPassword');
  }

  constructor(
    private _user:userManageServices
  ) { }

  ngOnInit(): void {
  }
  changePassword(id:any){
    this.selectedId = id;
  }
  resetPassword(){
    let data = {
      password: this.resetPasswordForm.value.rpassword,
      confirmPassword: this.resetPasswordForm.value.rconfirmPassword
    }
    this._user.resetPassword(this.selectedId,data).subscribe({
      next:(x:any)=>{     
        this.openSnackBar.emit({message:appMessages.passwordChanged});
      },
      error:(err:any)=>{   
        this.openSnackBar.emit({message: appMessages.passwordChangeError});
      },
      complete:()=>{
        (<any>$('.modal')).modal('hide');
      }
    });

  }
}
