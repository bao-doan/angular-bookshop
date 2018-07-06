import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../view-models/user';
import { Users } from '../view-models/users';
import { UserRegister } from '../view-models/user.register';
import { UserService } from '../services/user.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class AuthService {
  private loginUrl = 'http://green-web-ecommerce.herokuapp.com/v1/users/login';

  private status = new Subject<boolean>();
  private confirm = new Subject<boolean>();
  status$ = this.status.asObservable();
  confirm$ = this.confirm.asObservable();
  
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  announceStatus(status: boolean) {
    this.status.next(status);
  }
  confirmStatus(status: boolean) {
    this.confirm.next(status);
  }
  login(username: string, password: string) {
    return this.http.post<any>(this.loginUrl, { email: username, password: password })
      .pipe(map((res: any) => {
        if (res && res.token) {
          localStorage.setItem('currentUser', JSON.stringify({ email: username, token: res.token }));
        }
      }));
  }
  logout() {
    localStorage.removeItem('currentUser');
    // this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}