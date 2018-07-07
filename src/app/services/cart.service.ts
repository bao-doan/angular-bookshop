import { Injectable } from '@angular/core';
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
  constructor() { }
  
  // For localStorage methods
  getStorage(): any {
    return localStorage.getItem('currentCart');
  }
  removeStorage(): void {
    localStorage.removeItem('currentCart');
  }
  setStorage(): void {
    localStorage.setItem('currentCart', JSON.stringify(this.currentCart));
  }

  // For Shoping Cart
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
  updateCart() { 
    this.calculateCart();
    this.setStorage();
  }
  removeCart() {
    if (localStorage.getItem('currentCart')) {
      this.removeStorage();
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
    const currentCart = this.currentCart;
    let find_index = this.currentCart.items.findIndex((p) => { return p.book._id == book._id });
    let find_product = this.currentCart.items.find((p) => { return p.book._id == book._id });
    if (find_product) {
      this.currentCart.items[find_index].quantity = 0;
      currentCart.items = this.currentCart.items.filter((i) =>  i.quantity > 0 );
      console.log(`removeItem(): chon xoa ${book.title} co index = ${find_index}`)
    } else {
      console.log(`removeItem(): cannot remove because this product is not in Cart!`)
    }
    this.currentCart = currentCart;
    this.calculateCart();
    this.setStorage();
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
  checkNonsese(book: Book): boolean {
    return this.currentCart.items.find((p) => { return p.book._id == book._id })?true:false;
  }
}
