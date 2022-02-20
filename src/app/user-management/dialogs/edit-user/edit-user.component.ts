import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRoles } from 'src/app/interfaces/IRoles';
import { userManageServices } from '../../services/user-manage.service';
import { environment } from 'src/environments/environment';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { appMessages } from 'src/app/messages.config';

@Component({
  selector: 'dialog-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {

  baseUrl = environment.baseUrl;
  userToEdit: any;
  userAvatar: any;
  userAvatarPath: any;
  @Input() allRoleLists: IRoles[] = [];
  @Output("listAllUsers") listAllUsers: EventEmitter<any> = new EventEmitter();
  @Output("openSnackBar") openSnackBar: EventEmitter<any> = new EventEmitter();

  submitted: boolean = false;
  submitted_msg: string = '';
  submitted_success: boolean = false;

  user_selected: boolean = false;

  updateUserForm = new FormGroup({
    fullname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl(''),
    mobile: new FormControl(''),
    phone: new FormControl(''),
    dob: new FormControl(''),
    address: new FormControl(''),
    department: new FormControl(''),
    isactive: new FormControl('')
  });
  get fullName() {
    return this.updateUserForm.get('fullName');
  }
  get email() {
    return this.updateUserForm.get('email');
  }
  get mobile() {
    return this.updateUserForm.get('mobile');
  }
  constructor(
    private _userservices: userManageServices,
    private _datePipe: DatePipe,
    private _modalService: NgbModal,
    public _modal: NgbActiveModal
  ) { }
  ngOnInit(): void { }

  assignUserData(id: any) {

    this.submitted = false;
    this.submitted_success = false;
    this.submitted_msg = '';

    var tempUser: any;
    //reset roles binding 
    this.allRoleLists.filter(role => {
      role.isselected = false;
    });

    this._userservices.getUserById(id).subscribe({
      next: (data) => {
        tempUser = data;
      },
      error: (err: Error) => {
        alert('Error:' + err);
      },
      complete: () => {
        this.userToEdit = tempUser;
        console.log(this.userToEdit);

        let selected_roles = this.userToEdit[0].roles;

        //assign roles
        this.allRoleLists.filter(role => {
          if (selected_roles.indexOf(role.name) >= 0) {
            role.isselected = true;
          }
        });
        //assign all values
        this.updateUserForm.setValue({
          fullname: this.userToEdit[0].fullName,
          email: this.userToEdit[0].email,
          gender: this.userToEdit[0].gender,
          mobile: this.userToEdit[0].mobileNumber,
          phone: this.userToEdit[0].phoneNumber,
          dob: this._datePipe.transform(
            this.userToEdit[0].dateOfBirth,
            'yyyy-MM-dd'
          ),
          address: this.userToEdit[0].address,
          department: this.userToEdit[0].department,
          isactive: this.userToEdit[0].isActive
        });
        //assign avatar path
        this.userAvatarPath = this.baseUrl + this.userToEdit[0].profileImagePath;
      },
    });

  }
  // statusChanged(e:any){
  //   console.log(e.target.value);
  // }

  uploadFile(e: any) {
    if (e.target.files.length > 0) {
      this.userAvatar = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.userAvatarPath = event.target.result;
      }
    }
    console.log(this.userAvatar || '');
    console.log(this.userAvatar.name || '');
  }

  submitEditForm(id: any) {

    console.log(this.updateUserForm.value.isactive);
    var formData: any = new FormData();
    formData.append("id", id);
    formData.append("fullName", this.updateUserForm.value.fullname || '');
    formData.append("password", this.updateUserForm.value.password || '');
    formData.append("confirmPassword", this.updateUserForm.value.confirmPassword || '');
    formData.append("email", this.updateUserForm.value.email || '');
    formData.append("phoneNumber", this.updateUserForm.value.phone || '');
    formData.append("mobileNumber", this.updateUserForm.value.mobile || '');
    formData.append("address", this.updateUserForm.value.address || '');
    formData.append("gender", this.updateUserForm.value.gender || '');
    formData.append("dateOfBirth", this.updateUserForm.value.dob || '');
    formData.append("department", this.updateUserForm.value.department || '');
    formData.append("isActive", this.updateUserForm.value.isactive || false);
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

    this._userservices.update(formData).subscribe({
      next: (x: number) => {
        this.submitted = true;
        this.submitted_success = true;
        this.submitted_msg = appMessages.updated;
        this.openSnackBar.emit({message:this.submitted_msg});
      },
      error: (err: Error) => {
        this.submitted = true;
        this.submitted_msg = appMessages.updateError;
        this.openSnackBar.emit({message:this.submitted_msg});
      },
      complete: () => {
        this.listAllUsers.emit();
      },
    });
  }
}
