import { Component, OnInit, Input } from '@angular/core';
import { Banner } from '../view-models/banner';
import { Book } from '../view-models/book';
import { Genre } from '../view-models/genre';
import { Cart } from '../view-models/cart';
import { BookService } from '../services/book.service';
import { GenreService } from '../services/genre.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  componentTitle = 'Home';
  genres: Genre[];
  banners: Banner[];
  books: Book[];
  cart: Cart = JSON.parse(localStorage.getItem('currentCart'));
  books_sale: Book[];
  books_new: Book[];
  books_featured: Book[];
  constructor(
    private bookService: BookService,
    private genreService: GenreService,
    private cartService: CartService,
  ) {
    this.cartService.cartSource$.subscribe(_ => this.cart = JSON.parse(_))
  }
  setSlice() {
    this.books_sale = this.books.slice(0, 4);
    this.books_new = this.books.slice(4, 8);
    this.books_featured = this.books.slice(8, 12);
  }
  ngOnInit() {
    this.getBanners();
    this.getBooks();
    this.getGenres();
  }
  getBanners(): void {
    this.bookService.getBanners().subscribe(_ => this.banners = _)
  }
  getBooks(): void {
    this.bookService.getBooks().subscribe(_ => {
    this.books = _;
      this.setSlice();
    });
  }
  getGenres(): void {
    this.genreService.getGenres().subscribe(_ => this.genres = _);
  }

}
