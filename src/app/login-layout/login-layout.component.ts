import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.css']
})
export class LoginLayoutComponent implements OnInit {
  componentTitle = 'Login';
  formId: string = 'login';
  constructor() { }

  ngOnInit() {
  }

}
