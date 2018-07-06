import { Component, OnInit } from '@angular/core';
import { Genre } from '../view-models/genre';
import { GenreService } from '../services/genre.service';
import { Book } from '../view-models/book';
import { BookService } from '../services/book.service';
import { Cart } from '../view-models/cart';
import { Product } from '../view-models/cart';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
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
  constructor(private genreService: GenreService, private bookService: BookService) { }

  ngOnInit() {
    this.getGenres();
    this.getBooks();
    this.step = 12;
    this.cartInit();
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
  // current_cart = localStorage.getItem('currentCart');
  currentCart: Cart;
  // cartItems: Product[] = new Array<Product>();
  cartProduct = new Product();
  // Functions reusable
  getStorage(): any {
    return localStorage.getItem('currentCart');
  }
  removeStorage(): void {
    localStorage.removeItem('currentCart');
  }
  setStorage(): void {
    localStorage.setItem('currentCart', JSON.stringify(this.currentCart));
  }
  // Functions for Cart
  cartInit() {
    console.log(`cartInit(): getStorage = ${this.getStorage() ? true : false}`);
    if (this.getStorage()) {
      this.currentCart = JSON.parse(this.getStorage());
      console.log(`cartInit(): Da lay currentCart tu localStorage`);
    } else {
      this.currentCart = new Cart();
      localStorage.setItem('currentCart', JSON.stringify(this.currentCart));
      console.log(`cartInit(): Da tao moi currentCart = ${JSON.stringify(this.currentCart)}`);
    }
  }
  updateCart() { }
  removeCart() {
    if (localStorage.getItem('currentCart')) {
      // localStorage.removeItem('currentCart');
      this.removeStorage();
      // this.this.getCart() = null;
      this.currentCart = new Cart();
      this.cartProduct = new Product();
      console.log('removeCart(): Da remove currentCart')
    } else {
      console.log('removeCart(): Chua co currentCart');
    }
  }
  showCartInfo() {
 
    let cart_length = this.currentCart.items.length;
    let cart_list: string = '';
    for (let i = 0; i < cart_length; i++) {
      cart_list += `${this.currentCart.items[i].quantity} x ${this.currentCart.items[i].book.title}\n`
    }
    this.calculateCart();
    alert(`cart_length = ${cart_length}\n${cart_list}\nTotal = ${this.currentCart.total}\nDiscount = ${this.currentCart.discount}\nAmount = ${this.currentCart.amount}`);
  }
  addItem(book: Book) {
    const cartProduct = new Product();
    let find_product = this.currentCart.items.find((p) => { return p.book._id == book._id });
    let find_index = this.currentCart.items.findIndex((p) => { return p.book._id == book._id });
    if (find_product) {
      this.currentCart.items[find_index].quantity += 1;
    } else {
      cartProduct.book = book;
      cartProduct.quantity = 1;
      this.currentCart.items.push(cartProduct);
    }
    this.calculateCart();
    this.setStorage();
  }
  removeItem(book: Book) { 
    let find_product = this.currentCart.items.find((p) => { return p.book._id == book._id });
    if (find_product) {
      let find_index = this.currentCart.items.findIndex((p) => { return p.book._id == book._id });
      this.currentCart.items[find_index].quantity = 0;
      
    } else {
      alert(`removeItem(): cannot remove because this product is not in Cart!`)
    }
    this.currentCart.items = this.currentCart.items.filter((i) => { i.quantity > 0 });
  }
  setDiscount(percent: number) {
    if (percent >= 0 && percent <= 1) {
      this.currentCart.discount = this.currentCart.total * percent;
    } else { alert('setDiscount(): co cai gi sai sai, phai nhap 0 <= x <= 1') }
  }
  calculateCart() {
    let total: number = 0;
    for (let i = 0; i < this.currentCart.items.length; i++) {
      total += this.currentCart.items[i].book.sellingPrice * this.currentCart.items[i].quantity;
    }
    this.currentCart.total = total;
    this.setDiscount(0.3);
    this.currentCart.amount = this.currentCart.total - this.currentCart.discount;
  }
  count = 0
  myarray = new Array<any>();
  testPush(number: number) {
    
   
      // this.count = this.count + 1;
    
    this.myarray.push(number);
    alert(this.myarray);
  }
  checkNonsese(book: Book): boolean {
    return this.currentCart.items.find((p) => { return p.book._id == book._id })?true:false;
  }
}
