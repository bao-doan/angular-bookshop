import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Login } from '../view-models';


import { UserService } from './user.service';
import { User } from '../view-models/user';
import { Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginShopForm: FormGroup;
  loginObject: Login = new Login();

  private login = new Subject<Login>();
  private status = new Subject<boolean>();
  login$ = this.login.asObservable();
  status$ = this.status.asObservable();
  announceStatus(status: boolean) { this.status.next(status); }
  annouceLogin(login: Login) { this.login.next(login); }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {

  }
  // createLoginForm() {
  //   this.loginShopForm = this.fb.group({
  //     username: ['', Validators.required],
  //     password: ['', Validators.required]
  //   });
  // }
  get f() { return this.loginShopForm.controls; }
  onSubmit(form: FormGroup, returnUrl: string) {
    this.loginShopForm = form;
    this.loginObject.submitted = true;
    this.loginObject.returnUrl = returnUrl;
    this.annouceLogin(this.loginObject);
    if (form.invalid) {
      return;
    }
    this.isLoggedIn();
  }
  isLoggedIn(): void {
    // console.log(`LoginService: status$ = ${this.status$}`);
    if (this.status$) {
      // console.log(`LoginService: Ready to login`);
      this.onLogin();
    } else {
      // console.log(`LoginService: Cannot login`);
    }
  }
  onLogin(): void {
    this.loginObject.loading = true;
    this.annouceLogin(this.loginObject);
    this.authService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          // console.log(`status$: Da co Token = ${JSON.parse(localStorage.getItem('currentUser')).token}`);
          this.announceStatus(true);
          // console.log(`return URL = ${this.loginObject.returnUrl}`);
          this.router.navigate([this.loginObject.returnUrl]);
          this.loginObject.loading = false;
          this.loginObject.error = '';
          this.loginObject.status = true;
          this.annouceLogin(this.loginObject);
          
        },
        error => {
          this.loginObject.error = error.error.error;
          this.loginObject.loading = false;
          this.annouceLogin(this.loginObject);
          this.announceStatus(false);
        });
        

  }
}
