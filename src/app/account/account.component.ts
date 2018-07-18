import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../services/user.service';
import { OrderService } from '../services/order.service';
import { User } from '../view-models/user';
import { Order } from '../view-models/order';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  componentTitle = 'Account';
  user: User = new User();
  orders: Order[];
  constructor(
    private authService: AuthService, 
    private userService: UserService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.getUser();
    this.getOrder();
  }
  onLogout():void {
    this.authService.logout();
  }
  getUser():void {
    this.userService.getUsers().subscribe(_ => this.user = _.user);
  }
  getOrder(): void {
    this.orderService.getOrders().subscribe(_ => {
      this.orders = _;
      console.log(`AccountComponent: getOrders() Da get ${_.length} orders`);
    });
  }
}
