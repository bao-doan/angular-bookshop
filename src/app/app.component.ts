import { Component, OnInit, OnChanges, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { User } from './view-models/user';
import { Genre } from './view-models/genre';
import { Book } from './view-models/book';
import { UserService } from './services/user.service';
import { GenreService } from './services/genre.service';
import { CartService } from './services/cart.service';

import { Cart } from './view-models/cart';
import { Product } from './view-models/cart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent implements OnInit {
  // Properties for Genres & User
  genres: Genre[];
  user: User = new User();
  // Properties for communicating
  status: boolean = false;
 
  currentuser = JSON.parse(localStorage.getItem('currentUser'));
  constructor ( 
    private authService: AuthService,
    private userService: UserService,
    private genreService: GenreService,
    private cartService: CartService
  ) {
    // For get User
    this.authService.status$.subscribe(_ => {
      this.status = _;
      if (this.status == true) {this.getUsers()}
    })
    // For Shopping Cart
    this.cartService.cartSource$.subscribe(_ => this.cart = JSON.parse(_))
    this.cartService.countItem$.subscribe(_ => this.countItem = _)
  }
  ngOnInit () {
    this.getGenres();
    if (this.currentuser) {
      this.status = true;
      this.onAnnounce(this.status);
      
      this.getUsers();
    } else {
      this.onAnnounce(this.status);
      console.log(`App onInit: loginStatus = ${this.status}`);
    }
    this.cartService.cartInit();
    this.cartService.getStorage();
    this.cart;
    this.cartService.countItemInCart();
  }
  getGenres(): void {
    this.genreService.getGenres().subscribe(_ => this.genres = _);
  }
  getUsers(): void {
    if(this.status == true) {
      this.userService.getUsers().subscribe(_ => 
        {
          this.user = _.user;
          console.log(`AppComponent: getUsers(): ${this.user.first}`);
        })
    } else {
      this.user = new User();
      alert(`AppComponent: getUsers() says user.first = ${this.user.first}`);
      console.log(`AppComponent getUsers(): Chua Login`);
    }
  }
  onLogout(): void {
    this.authService.logout();
    this.status = false;
    this.onAnnounce(this.status);
    this.getUsers();
    alert(`AppComponent: onLogout() says status = ${this.status}`);
  }
  onAnnounce(status: boolean) {
    this.authService.announceStatus(status);
  }

  //For Shopping Cart (instance)
  protected cart: Cart = JSON.parse(this.cartService.getStorage());
  removeItem(book: Book) {
    this.cartService.removeItem(book);
  }
  protected countItem: number;
}
