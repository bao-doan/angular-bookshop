import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';


import { UserService } from '../services/user.service';
import { User } from '../view-models/user';
import { Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  loginShopForm: FormGroup;

  private status = new Subject<boolean>();
  // private confirm = new Subject<boolean>();
  status$ = this.status.asObservable();
  // confirm$ = this.confirm.asObservable();
  // status: boolean;
  announceStatus(status: boolean) {
    this.status.next(status);
  }
  // confirmStatus(status: boolean) {
  //   this.confirm.next(status);
  // }
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
    this.submitted = true;
    this.loginShopForm = form;
    this.returnUrl = returnUrl;
    if (form.invalid) {
      return;
    }
    this.isLoggedIn();
  }
  isLoggedIn(): void {
    // this.authService.status$.subscribe(_ => {
    //   this.status = _;
    //   console.log(`status$ = ${_}`);
    // });
    console.log(`LoginService: status$ = ${this.status$}`);
    if (this.status$) {
      console.log(`LoginService: Ready to login`);
      this.onLogin();
    } else {
      console.log(`LoginService: Cannot login`);
    }
  }
  onLogin(): void {
    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(`status$: Da co Token = ${JSON.parse(localStorage.getItem('currentUser')).token}`);
          this.announceStatus(true);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          alert(error.error.error);
          this.error = error;
          this.loading = false;
        });

  }
}
