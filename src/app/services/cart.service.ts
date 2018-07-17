import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../view-models/book';
import { Cart } from '../view-models/cart';
import { Product } from '../view-models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  currentCart: Cart;
  cartProduct = new Product();
  discount: number;

  private cartSource = new Subject<string>();
  cartSource$ = this.cartSource.asObservable();

  // public discount_input: string = '';
  public discount_code: string = 'BLACK_FRIDAY';
  public discount_percent: number = 30/100;

  constructor() { }

  // For localStorage methods
  getStorage(): string {
    return localStorage.getItem('currentCart');
  }
  removeStorage(): void {
    localStorage.removeItem('currentCart');
  }
  setStorage(): void {
    localStorage.setItem('currentCart', JSON.stringify(this.currentCart));
    this.cartSource.next(JSON.stringify(this.currentCart));
  }

  // For Shoping Cart methods
  cartInit() {
    if (this.getStorage()) {
      this.currentCart = JSON.parse(this.getStorage());
    } else {
      this.currentCart = new Cart();
      localStorage.setItem('currentCart', JSON.stringify(this.currentCart));
    }
  }
  removeCart() {
    if (localStorage.getItem('currentCart')) {
      this.removeStorage();
      this.currentCart = new Cart();
      this.cartProduct = new Product();
      this.countItemInCart();
      this.calculateAll();
      this.setStorage();
    } else {
    }
  }
  addItem(book: Book, inputQuantity: number) {
    const cartProduct = new Product();
    let find_product = this.currentCart.items.find((p) => { return p.book._id == book._id });
    let find_index = this.currentCart.items.findIndex((p) => { return p.book._id == book._id });
    if (find_product) {
      this.currentCart.items[find_index].quantity += inputQuantity;
    } else {
      cartProduct.book = book;
      cartProduct.quantity = inputQuantity;
      this.currentCart.items.push(cartProduct);
    }
    this.countItemInCart();
    this.currentCart.total = this.setTotal();
    this.setStorage();
  }
  removeItem(book: Book) {
    const currentCart = this.currentCart;
    let find_index = this.currentCart.items.findIndex((p) => { return p.book._id == book._id });
    let find_product = this.currentCart.items.find((p) => { return p.book._id == book._id });
    if (find_product) {
      this.currentCart.items[find_index].quantity = 0;
      currentCart.items = this.currentCart.items.filter((i) => i.quantity > 0);
    } else {
    }
    this.currentCart = currentCart;
    this.countItemInCart();
    this.currentCart.total = this.setTotal();
    this.calculateAll();
    this.setStorage();
  }

  calculateAll() {
    let cart = this.currentCart; // For shorthand typing

    cart.total = this.setTotal();
    cart.discount = (JSON.parse(this.getStorage()).items.length==0)?0:cart.discount;
    cart.amount = cart.total - cart.discount;
    cart.shipping = cart.shipping;
    cart.payable = cart.total - cart.discount + cart.shipping; 

  }
  updateCart(cart: Cart) {
    this.currentCart = cart;
    this.countItemInCart();
    this.calculateAll();
    this.setStorage();
  }
  setTotal():number {
    let total: number = 0;
    for (let i = 0; i < this.currentCart.items.length; i++) {
      total += this.currentCart.items[i].book.sellingPrice * this.currentCart.items[i].quantity;
    }
    return total;
  }
  
  setDiscount(input: string): number {
    let code = this.discount_code;
    let percent = this.discount_percent;
    return this.currentCart.total * ((input == code) ? percent : 0);
  }
  setDiscountAmount(): number {
    return 0;
  }
  setShipping(input: number): number {
    return input;
    // maybe I'll delete this method
  }
  
  countItemInCart() {
    let count: number = 0;
    for (let i = 0; i < this.currentCart.items.length; i++) {
      count += this.currentCart.items[i].quantity;
    }
    this.currentCart.book_counted = count;
    this.setStorage();
  }

}
