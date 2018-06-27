import { Component, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

import { UserService } from '../services/user.service';
import { User } from '../view-models/user';
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
  // For get user after logging in
  user: User = this.authService.user;
  
  // Demo output\
  // @Output() outputValue: string = 'this is Demo Output';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loginShopForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // reset login status
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
  onCheckLoggedIn(): void {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      console.log('Da nhan thong tin Login')
      document.getElementById('hiddenLogin').click();
    } 
    return console.log('baodoan: No currentUser!');
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
    let currentuser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentuser && currentuser.token) {
      // store username and jwt token in local storage to keep user logged in between page refreshes
      console.log(`Already logged in, User: ${currentuser.email} | Token: ${currentuser.token}`);
      alert(`You must logout before logging in as an another User`)
    } else {
      console.log('No user logged in, ready to log in now');
      this.onLogin();
    }
  }
  onLogin(): void {
    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          // this.user = this.authService.user;
          // if (this.user) {console.log(`Login da lay user thanh cong ${this.user.first}`);}
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });

        // Neu da log in vao roi thi ley User luon
        // this.user = this.authService.user;
        // this.authService.getUsers();
        // this.user = this.authService.user;
        if (localStorage.getItem('currentUser')) {
          console.log(`Da co Token`);
          this.userService.getUsers().subscribe(_ =>
             {
               this.user = _.user;
               console.log(`Login da lay User ${this.user.first}`);
            }
          )
        }
  }
  // getUsers(): void {
  //   this.userService.getUsers().subscribe(_ => {
  //     this.user = _.user;
  //     console.log(`Da get User ${this.user.first}`);
  //   } );
  // }

}
