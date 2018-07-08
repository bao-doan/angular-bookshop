import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart, Product } from '../view-models/cart';
import { Book } from '../view-models/book';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService) {
    this.cartService.cartSource$.subscribe(_ => this.cart = JSON.parse(_))
    this.cartService.countItem$.subscribe(_ => this.countItem = _)
  }

  ngOnInit() {
  }
  inputQuantity: number = 1;
  protected countItem: number;
  protected cart: Cart = JSON.parse(this.cartService.getStorage());
  removeItem(book: Book) {
    this.cartService.removeItem(book);
  }
  addItem(book: Book) {
    this.cartService.addItem(book, this.inputQuantity);
  }
  updateCart(items: Product[]) {
    this.cart.items = items;
    this.cart.discount = this.cartService.setDiscountAmount(this.discount_input, this.discount_code, this.discount_percent);
    this.cartService.setStorage();
  }
  discount_input: string = ''
  discount_code: string = 'BOOKISFRIEND';
  discount_percent: number = 30/100;
  // setDiscountPercent(input: string, code: string, percent: number): number {
  //   return (input == code) ? percent : 0;
  // }
  // setDiscountAmount(input: string, code: string, percent: number): number {
  //   return this.cart.total * this.setDiscountPercent(input, code, percent);
  // }

}
