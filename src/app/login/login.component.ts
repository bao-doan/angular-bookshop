import { Component, OnInit, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

import { UserService } from '../services/user.service';
import { User } from '../view-models/user';
import { HeaderComponent } from '../header/header.component';
import { Subscription }   from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  // Properties for Login Form
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  loginShopForm: FormGroup;
  user:User = new User();
  // Properties for communicating
  status: boolean;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.status$.subscribe(_ => {
      this.status = _;
    })
   }
  ngOnInit() {
    this.loginShopForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginShopForm.controls; }

  onSubmit() {
    this.submitted = true;
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
    this.authService.status$.subscribe(_ => {
      this.status = _;
      console.log(`status$ = ${_}`);
    });
    if (this.status == false) {
      console.log(`LoginComponent: status = ${this.status} -> Ready to login`);
      this.onLogin();
    } else {
      console.log(`LoginComponent: status = ${this.status} -> Cannot login`);
    }
  }
  onLogin(): void {
    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          alert(`LoginComponent: Da co Token = ${JSON.stringify(localStorage.getItem('currentUser'))}`);
          this.status = true;
          this.authService.announceStatus(this.status);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
        
  }
}
