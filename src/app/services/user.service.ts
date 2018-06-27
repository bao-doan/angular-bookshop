import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../view-models/user';
import { Users } from '../view-models/users';
import { UserRegister } from '../view-models/user.register';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'http://green-web-ecommerce.herokuapp.com/v1/users/';
  constructor(private http: HttpClient) { }
  getUsers(): Observable<Users> {
    return this.http.get<Users>(this.userUrl);
  }
  addUser(users: UserRegister): Observable<UserRegister> {
    return this.http.post<UserRegister>(this.userUrl, users, httpOptions);
  }
}
