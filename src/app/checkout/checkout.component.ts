import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { UserService } from '../services/user.service';
import { OrderService } from '../services/order.service';
import { Order, BOOK } from '../view-models/order';
import { User } from '../view-models/user';
import { Cart } from '../view-models/cart';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {
  shipping: number = 0;
  shippingDefaultIndex: number;
  protected shippingOptions = [
    { description: 'Free Shipping', fee: 0 },
    { description: 'Standard Shipping', fee: 15000 },
    { description: 'Urgent Shipping', fee: 30000 },
  ]

  order: Order = new Order();
  user: User = new User();
  cart: Cart;
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private userService: UserService
  ) { 
    this.cartService.cartSource$.subscribe(_ => this.cart = JSON.parse(_));
  }

  ngOnInit() {
    this.onInitShipping(1);
    this.getUser();
  }
  // auto-select radio & set shipping value when Component is once created
  onInitShipping(index: number) {
    if (index >= this.shippingOptions.length) {
      this.shippingDefaultIndex = 0;
    } else {
      this.shippingDefaultIndex = index;
    }
    this.shipping = this.shippingOptions[index].fee;
  }
  // change value when user click a radio
  onSelectShiping(number: number) {
    this.shipping = number;
  }
  addOrder(): void {
      if (this.cart) {
        const book = new BOOK();
        let order = this.order;
        order._user = this.user._id;
        // order.books._book = this.cart.;
        for (let i=0; i< this.cart.items.length; i++) {
          book._book = this.cart.items[i].book._id;
          book.quantity = this.cart.items[i].quantity;
          book.price = this.cart.items[i].book.sellingPrice;
          order.books.push(book);
        }
        order.total = this.cart.payable;

    
      }
      this.orderService.addOrder(this.order).subscribe(data => { console.log(`Da dat hang thanh cong`) });
  }
  getUser(): void {
    this.userService.getUsers().subscribe(_ => this.user = _.user);
  }
  setShipping() {
    this.cart.shipping = this.shipping;
    
  }
}
