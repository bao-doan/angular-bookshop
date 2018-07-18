import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { User, Cart, Genre, Book, Size, Image, Login } from './view-models';
import { UserService, GenreService, BookService, CartService, LoginService } from './services';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent implements OnInit {
  // Properties for Genres & User
  genres: Genre[];
  books: Book[];
  user: User = new User();
  currentuser = localStorage.getItem('currentUser');

  login: Login = new Login();
  // error: string;
  // tokenAlive: boolean;
  status: boolean = false;

  selectedBook: Book = new Book();
  // For Shopping Cart (dropdown)
  cart: Cart = JSON.parse(this.cartService.getStorage());
  // For avoiding form's id conflict
  formId: string = 'app';
  // For searching
  title: string;

  constructor(
    private authService: AuthService,
    public loginService: LoginService,
    private userService: UserService,
    private genreService: GenreService,
    private bookService: BookService,
    private cartService: CartService,
    private router: Router
  ) {
    this.loginService.login$.subscribe(_ => {
      this.login = _;
      if (_.status) {this.getUser()}
    });
    // For get User if user has logged in
    this.loginService.status$.subscribe(_ => {
      if (_ !== undefined) {
        this.status = _;
        if (_ && !this.login.error) {
          this.getUser();
        }
      }
    })
    // For Shopping Cart
    this.cartService.cartSource$.subscribe(_ => this.cart = JSON.parse(_));
  }
  ngOnInit() {
    this.getGenres();
    this.getBooks();
    this.checkStorage();
    this.cartService.cartInit();
    this.cartService.getStorage();
    this.cartService.countItemInCart();
  }
  checkStorage() {
    if (this.currentuser) {
      this.status = true;
      this.loginService.announceStatus(this.status);
      this.getUser();
    } else {
      this.loginService.announceStatus(this.status);
    }
  }
  onSelect(book: Book): void {
    this.selectedBook = book;
    if (this.selectedBook.pages == null) {
      this.selectedBook.pages = 0;
    }
    if (this.selectedBook.weight == null) {
      this.selectedBook.weight = 0;
    }
    if (this.selectedBook.releaseDate == null) {
      this.selectedBook.releaseDate = '';
    }
    if (this.selectedBook.sku == null) {
      this.selectedBook.sku = 'No SKU';
    }
    if (this.selectedBook.images == null) {
      this.selectedBook.images = new Image();
    }
    if (this.selectedBook.size == null) {
      this.selectedBook.size = new Size();
    }
  }
  getGenres(): void {
    this.genreService.getGenres().subscribe(_ => this.genres = _);
  }
  getBooks(): void {
    this.bookService.getBooks().subscribe(_ => this.books = _);
  }
  getUser(): void {
    if (this.status) {
      this.userService.getUsers().subscribe(
        data => {

          // this.status = true;
          // this.loginService.announceStatus(this.status);

          this.user = data.user;
          this.login.error = '';
          this.loginService.annouceLogin(this.login);
        },
        error => {
          this.login.error = error.error;
          this.loginService.annouceLogin(this.login);
        }
      )
    } else {
      this.user = new User();
    }

  }
  onLogout(): void {
    this.authService.logout();
    // this.status = false;
    // this.loginService.announceStatus(this.status);
    this.login.error = '';
    this.login.loading = false;
    this.login.status = false;
    this.login.submitted = false;
    this.loginService.annouceLogin(this.login);

    this.userService.getUsers().subscribe(_ => this.user = _.user, error => this.user = new User());
    // alert(`AppComponent: onLogout() says status = ${this.status}`);
  }
  removeItem(book: Book) {
    this.cartService.removeItem(book);
  }
  // For clear search button
  onClearSearch() {
    this.title = '';
  }
  // For dark overlay
  openOverlay(z: string) {
    let overlay = document.getElementById("myOverlay");
    overlay.style.display = "block";
    overlay.style.opacity = "0.5";
    overlay.style.zIndex = z;
  }
  closeOverlay() {
    let overlay = document.getElementById("myOverlay");
    overlay.style.display = "none";
    overlay.style.opacity = "0";
  }
}
