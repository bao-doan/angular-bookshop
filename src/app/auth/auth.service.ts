import { Injectable } from '@angular/core';
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
  user: User = new User();
  private loginUrl = 'http://green-web-ecommerce.herokuapp.com/v1/users/login';
  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) { }

  login(username: string, password: string) {
    return this.http.post<any>(this.loginUrl, { email: username, password: password })
      .pipe(map((res: any) => {
        // login successful if there's a jwt token in the response
        if (res && res.token) {
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ email: username, token: res.token }));
          // this.onReloadWindow();
          if (localStorage.getItem('currentUser')) {
            this.getUsers();
            console.log(`AuthService: Da co currentUser first = ${this.user.first}`)
          } else {console.log(`AuthService: Chua co currentUser`)}
        }
      }));
      
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // navigate to login component
    // this.loggedIn.next(false);
    // this.router.navigate(['/login']);
    // this.onReloadWindow();
  }
  onReloadWindow() {
    window.location.reload();
  }
  onReturnCurrentContent() {
    
  }
  getUsers(): void {
    this.userService.getUsers().subscribe(_ => {
      this.user = _.user;
      console.log(`AuthService da get User ${this.user.first}`);
    } );
  }
}