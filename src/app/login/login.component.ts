import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { LoginService, UserService } from '../services'
import { User, Login } from '../view-models';
import { HeaderComponent } from '../header/header.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  componentTitle = 'Login';
  user: User = new User();
  // Properties for Login Form
  loginShopForm: FormGroup;
  // Properties for login communicating
  login: Login = this.loginService.loginObject;
  status: boolean;
  // For avoiding ID conflict
  @Input() formId;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public loginService: LoginService
  ) {
    this.loginService.status$.subscribe(_ => { this.status = _ })
    this.loginService.login$.subscribe(_ => { this.login = _ })
  }
  ngOnInit() {
    this.createLoginForm();
    this.login.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loginService.annouceLogin(this.login);
  }
  createLoginForm() {
    this.loginShopForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get f() { return this.loginShopForm.controls; }
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
  onSubmit() {

    this.loginService.onSubmit(this.loginShopForm, this.login.returnUrl);
    // this.loginService.annouceLogin(this.login);
  }
}
