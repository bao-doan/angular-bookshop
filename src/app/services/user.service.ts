import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users, UserRegister, User } from '../view-models';
import { catchError } from '../../../node_modules/rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'https://green-web-ecommerce.herokuapp.com/v1/users/';

  constructor(private http: HttpClient) { }
  getUsers(): Observable<Users> {
    return this.http.get<Users>(this.userUrl);
  }
  addUser(users: UserRegister): Observable<UserRegister> {
    return this.http.post<UserRegister>(this.userUrl, users, httpOptions);
  }
}
