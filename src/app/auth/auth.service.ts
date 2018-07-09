import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private loginUrl = 'http://green-web-ecommerce.herokuapp.com/v1/users/login';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(email: string, password: string) {
    return this.http.post<any>(this.loginUrl, { email: email, password: password })
      .pipe(map((res: any) => {
        if (res && res.token) {
          localStorage.setItem('currentUser', JSON.stringify({ email: email, token: res.token }));
        }
      }));
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

}