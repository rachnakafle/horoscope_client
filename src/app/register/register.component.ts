import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  submitted: boolean = false;
  submitted_msg: string = '';
  submit_success: boolean = false;

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.min(999999999),
      Validators.max(10000000000),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  constructor(private _authorize: AuthService) {
    this.submitted = false;
    this.submit_success = false;
  }

  ngOnInit(): void {}

  get username() {
    return this.registerForm.get('username');
  }
  get phone() {
    return this.registerForm.get('phone');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }

  registerOnSubmit() {
    let objerror: any;
    let data = {
      username: this.registerForm.value.username,
      mobileNumber: String(this.registerForm.value.phone),
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };
    console.log(data);
    this._authorize.register(data).subscribe({
      next: (x: any) => {
        console.log(x);
        this.submitted = true;
        this.submitted_msg = x.message;
        this.submit_success = true;
      },
      error: (err: Error) => {
        console.log(err);
        this.submitted = true;
        objerror = err;
        this.submitted_msg = objerror.error.message;
        console.log(this.submitted_msg);        
      },
      complete: () => {
        // this._router.navigate(['/login']);
      },
    });
  }
}
