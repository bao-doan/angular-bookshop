import { Component, OnInit, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
import { User } from '../view-models/user';
import { HeaderComponent } from '../header/header.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  // Properties for Login Form
  loading: boolean = this.loginService.loading;
  submitted: boolean = this.loginService.submitted;
  returnUrl: string;
  error: any = this.loginService.error;
  user: User = new User();
  loginShopForm: FormGroup;
  // Properties for communicating
  // For avoiding ID conflict
  @Input() formId;
  status: boolean;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public loginService: LoginService
  ) {
    this.loginService.status$.subscribe(_ => {
      this.status = _;
    })
  }
  ngOnInit() {
    this.createLoginForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
    this.loginService.onSubmit(this.loginShopForm, this.returnUrl);
  }
}
