import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../view-models/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: User = new User();
  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }
  onLogout():void {
    this.authService.logout();
  }
  getUser():void {
    this.userService.getUsers().subscribe(_ => this.user = _.user);
  }
}
