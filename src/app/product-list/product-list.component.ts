import { Component, OnInit } from '@angular/core';
import { Genre } from '../view-models/genre';
import { GenreService } from '../services/genre.service';
import { Book } from '../view-models/book';
import { BookService } from '../services/book.service';
import { Cart } from '../view-models/cart';
import { Product } from '../view-models/cart';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  componentTitle = 'Product List';
  genres: Genre[];
  books: Book[];
  booksInCart: Book[] = [];
  // For Pagination
  books2: Book[];
  step: number;
  pages: number;
  selectedPage: number = 1;
  pageArray: Number[];
  option: number;
  checkPluralItems: string = '';
  checkPluralBooks: string = '';
  constructor(
    private genreService: GenreService, 
    private bookService: BookService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.getGenres();
    this.getBooks();
    this.step = 12;
  }
  // For get Genres & Books
  getGenres(): void {
    this.genreService.getGenres().subscribe(_ => this.genres = _);
  }
  getBooks(): void {
    this.bookService.getBooks().subscribe(z => {
      this.books = z;
      this.books2 = z.slice(0, this.step);
      this.onCountPages(z, this.step);
      this.onPrintLabel();
      this.checkPluralHandler();
    });
  }
  // For Pagination
  onCountPages(books: Book[], step: number): void {
    let items = this.books.length;
    let pages: number;
    if (items % step == 0) {
      pages = items / step;
    } else {
      pages = Math.floor(items / step) + 1;
    }
    this.pages = pages;
    // console.log(`Books = ${this.books.length}`);
    // console.log(`Step = ${this.step}`);
    // console.log(`Pages = ${this.pages}`);
  }
  onPrintLabel(): void {
    this.pageArray = new Array(this.pages);
    for (let i = 0; i < this.pageArray.length; i++) {
      this.pageArray[i] = i + 1;
    }
    // console.log(this.pageArray);
  }
  onShowItems(i: number): void {
    // this.onShowAll();
    this.selectedPage = i;
    let a: number = this.step * i - this.step;
    let b: number
    if (this.step * i >= this.books.length) {
      b = this.books.length;
    } else {
      b = this.step * i;
    }
    this.books2 = this.books.slice(a, b);
    this.checkPluralHandler();
    // console.log(`selectedPage: ${this.selectedPage}`);
  }
  onShowAll(): void {
    this.books2 = this.books;
    this.checkPluralHandler();

  }
  onShowOption(step: number): void {
    // this.step = option;
    this.onCountPages(this.books, this.step);
    this.onPrintLabel();
    this.onShowItems(1);
  }
  onNextPage(selectedPage: number): void {
    // if(selectedPage < this.pages) {

    //   this.selectedPage = selectedPage + 1;
    // } else {
    //   this.selectedPage = selectedPage;
    // }
    this.selectedPage = (selectedPage < this.pages) ? (this.selectedPage = selectedPage + 1) : (this.selectedPage = selectedPage);
    this.onShowItems(this.selectedPage);
    // console.log(`Triggered "Next" ${this.selectedPage}/${this.pages}`);
  }
  onPrevPage(selectedPage: number): void {
    // if(selectedPage > 1) {

    //   this.selectedPage = selectedPage - 1;
    // } else {
    //   this.selectedPage = 1;
    // }
    this.selectedPage = (selectedPage > 1) ? (this.selectedPage = selectedPage - 1) : (this.selectedPage = 1);
    this.onShowItems(this.selectedPage);
    // console.log(`Triggered "Prev" ${this.selectedPage}/${this.pages}`);
  }
  checkPluralHandler(): void {
    this.checkPluralBooks = (this.books.length > 1) ? "items" : "item";
    this.checkPluralItems = (this.books2.length > 1) ? "items" : "item";
  }
  // For Shopping Cart
  addItem(book: Book) {
    this.cartService.addItem(book, 1);
  }

}
