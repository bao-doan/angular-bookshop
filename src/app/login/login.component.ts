import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

import { UserService } from '../services/user.service';
import { User } from '../view-models/user';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  loginShopForm: FormGroup;
  private formSubmitAttempt: boolean;
  user:User = new User();
  // Demo output
  @Input() loginStatus: boolean;
  @Output() loginStatusChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }
  ngOnInit() {
    // alert(`LoginComponent: loginStatus = ${this.loginStatus}`);
    this.loginShopForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // this.authService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginShopForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginShopForm.invalid) {
      return;
    }
    this.isLoggedIn();
  }
  // For toggle Show or Hide password input
  show: string = "password";
  value: number = 0;
  onToggle(): void {
    if (this.value % 2 == 1) {
      this.show = "password";
      this.value = 0;
    } else {
      this.show = "text";
      this.value = 1;
    }
  }
  isLoggedIn(): void {
    // let currentuser = JSON.parse(localStorage.getItem('currentUser'));
    // if (currentuser && currentuser.token) {
    //   // store username and jwt token in local storage to keep user logged in between page refreshes
    //   console.log(`Already logged in, User: ${currentuser.email} | Token: ${currentuser.token}`);
    //   alert(`You must logout before logging in as an another User`)
    // } else {
    //   console.log('No user logged in, ready to log in now');
    //   this.onLogin();
    // }
    if (this.loginStatus == false) {
      console.log(`Login đã nhận loginStatus = false -> Ready to login`);
      this.onLogin();
    } else {
      console.log(`Login đã nhận loginStatus = true -> Will not do login`);
    }
  }
  onLogin(): void {
    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          alert(`LoginComponent: Da co Token = ${JSON.stringify(localStorage.getItem('currentUser'))}`);
          this.loginStatus = true;
          this.loginStatusChange.emit(this.loginStatus);
          alert(`LoginComponent: loginStatus = ${this.loginStatus} -> Emitted to loginStatusChange`)
          // this.getUser();
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
        
  }
  getUser():void {
    this.userService.getUsers().subscribe(_ => {
      this.user = _.user;
    });
  }
}
