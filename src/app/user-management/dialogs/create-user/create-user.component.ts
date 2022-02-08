import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRoles } from 'src/app/interfaces/IRoles';
import { appMessages } from 'src/app/messages.config';

import { userManageServices } from '../../services/user-manage.service';

@Component({
  selector: 'dialog-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  submitted: boolean = false;
  submitted_success: boolean = false;
  submitted_msg: string = '';

  userAvatarPath: any;
  userAvatar: any;

  @Input() allRoleLists: IRoles[] = [];
  @Output("listAllUsers") listAllUsers: EventEmitter<any> = new EventEmitter();
  @Output("openSnackBar") openSnackBar: EventEmitter<any> = new EventEmitter();


  createUserForm = new FormGroup({
    fullname: new FormControl('', [Validators.required]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl(''),
    mobile: new FormControl(''),
    phone: new FormControl(''),
    dob: new FormControl(''),
    address: new FormControl(''),
    department: new FormControl(''),
    roles: new FormControl([]),
    avatar: new FormControl(''),
  });


  get fullName() {
    return this.createUserForm.get('fullName');
  }
  get email() {
    return this.createUserForm.get('email');
  }
  get mobile() {
    return this.createUserForm.get('mobile');
  }
  get username() {
    return this.createUserForm.get('username');
  }
  get password() {
    return this.createUserForm.get('password');
  }
  get confirmPassword() {
    return this.createUserForm.get('confirmedPassword');
  }

  constructor(private _userservices: userManageServices) { }

  ngOnInit(): void {
  }
  uploadFile(e: any) {

    if (e.target.files.length > 0) {
      this.userAvatar = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.userAvatarPath = event.target.result;
      }
    }

  }

  /************
   * Create User Method Starts
   */
  createUser(): void {

    let formData: any = new FormData();
    formData.append("fullName", this.createUserForm.value.fullname || '');
    formData.append("userName", this.createUserForm.value.username || '');
    formData.append("password", this.createUserForm.value.password || '');
    formData.append("confirmPassword", this.createUserForm.value.confirmPassword || '');
    formData.append("email", this.createUserForm.value.email || '');
    formData.append("phoneNumber", this.createUserForm.value.phone || '');
    formData.append("mobileNumber", this.createUserForm.value.mobile || '');
    formData.append("address", this.createUserForm.value.address || '');
    formData.append("gender", this.createUserForm.value.gender || '');
    formData.append("dateOfBirth", this.createUserForm.value.dob || '');
    formData.append("department", this.createUserForm.value.department || '');
    formData.append("profileImage", this.userAvatar || '');
    // formData.append("roles", myroles );

    let roleCount = 0;
    this.allRoleLists.filter(role => {
      if (role.isselected === true) {
        roleCount++;
        formData.append("roles", role.name);
      }
    });
    if (roleCount < 1) {
      formData.append("roles", 'Customer');
    }

    this._userservices.addNewUser(formData).subscribe({
      next: (x: number) => {
        this.submitted = true;
        this.submitted_success = true;
        this.submitted_msg = appMessages.userCreated;
        console.log(x);
        this.openSnackBar.emit({message:this.submitted_msg});
      },
      error: (err: Error) => {
        this.submitted = true;
        this.submitted_msg = appMessages.userCreateError + err.message;
        console.log(err);
        this.openSnackBar.emit({message:this.submitted_msg});
      },
      complete: () => {
        this.listAllUsers.emit();
        this.createUserForm.reset();
        document.getElementById('modal-content')?.scrollIntoView();
      },
    });


  }

  /************
     * Create User Method Ends
  */

}
