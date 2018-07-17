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
  componentTitle = 'Shopping Cart';
  inputQuantity: number = 1;
  cart: Cart = JSON.parse(this.cartService.getStorage());

  discount_input: string = '';
  constructor(public cartService: CartService) {
    this.cartService.cartSource$.subscribe(_ => this.cart = JSON.parse(_))
  }

  ngOnInit() {
  }
  
  removeItem(book: Book) {
    this.cartService.removeItem(book);
  }
  addItem(book: Book) {
    this.cartService.addItem(book, this.inputQuantity);
  }
  updateCart() {
   
    this.cart.discount = this.cartService.setDiscount(this.discount_input.trim());
    this.cart.amount = this.cart.total - this.cart.discount;
    this.cartService.updateCart(this.cart);
  }
  

}
