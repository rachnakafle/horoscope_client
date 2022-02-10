import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    username: new FormControl ('', [Validators.required,  Validators.minLength(4)]),
    phone: new FormControl ('', [Validators.required, Validators.min(999999999), Validators.max(1000000000)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  })
  
  constructor() { }

  ngOnInit(): void {
  }

}
