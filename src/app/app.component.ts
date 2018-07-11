import { Component, OnInit, OnChanges, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { User } from './view-models/user';
import { Genre } from './view-models/genre';
import { Book } from './view-models/book';
import { UserService } from './services/user.service';
import { GenreService } from './services/genre.service';
import { CartService } from './services/cart.service';
import { LoginService } from './services/login.service';
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
  status: boolean = false;
  currentuser = localStorage.getItem('currentUser');
  // For Shopping Cart (dropdown)
  protected cart: Cart = JSON.parse(this.cartService.getStorage());
  // For avoiding form's id conflict
  formId: string = 'app';
  constructor(
    private authService: AuthService,
    public loginService: LoginService,
    private userService: UserService,
    private genreService: GenreService,
    private cartService: CartService
  ) {
    // For get User if user has logged in
    this.loginService.status$.subscribe(_ => {
      console.log(`App: constructor(): _ = ${_}`)
      if (_ !== undefined) {
        this.status = _;
        if (_) {this.getUser();}
      }
    })
    // For Shopping Cart
    this.cartService.cartSource$.subscribe(_ => this.cart = JSON.parse(_));
  }
  ngOnInit() {
    this.getGenres();
    this.checkToken();
    this.cartService.cartInit();
    this.cartService.getStorage();
    this.cart;
    this.cartService.countItemInCart();
  }
  checkToken() {
    if (this.currentuser) {
      this.status = true;
      this.loginService.announceStatus(this.status);
      this.getUser();
    } else {
      this.loginService.announceStatus(this.status);
      console.log(`App onInit: loginStatus = ${this.status}`);
    }
  }
  getGenres(): void {
    this.genreService.getGenres().subscribe(_ => this.genres = _);
  }
  getUser(): void {
    if (this.status) {
      this.userService.getUsers().subscribe(_ => {
        this.user = _.user;
        // alert(`Welcome back ${this.user.first.bold()} ${this.user.last.bold()}!\nHave fun shopping with us.`);
      })
    } else {
      this.user = new User();
      console.log(`AppComponent getUsers(): Chua Login`);
    }
  }
  onLogout(): void {
    this.authService.logout();
    this.status = false;
    this.loginService.announceStatus(this.status);
    this.getUser();
    alert(`AppComponent: onLogout() says status = ${this.status}`);
  }
  removeItem(book: Book) {
    this.cartService.removeItem(book);
  }
}
