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
  componentTitle = 'Checkout';
  checkoutConfirm = false;
  shipping: number = 0;
  shippingDefaultIndex: number;
  shippingOptions = [
    { description: 'Free Shipping', fee: 0 },
    { description: 'Standard Shipping', fee: 15000 },
    { description: 'Urgent Shipping', fee: 30000 },
  ]

  order: Order = new Order();
  user: User = new User();
  cart: Cart = JSON.parse(this.cartService.getStorage());
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
    this.cart.shipping = this.shipping
    this.cartService.updateCart(this.cart);
  }
  checkConfirm() {
    if (this.checkoutConfirm) {
      this.addOrder();
    } else {
      let confirmation = confirm(`You have to confirm your order (Check me out)\nAre you sure to make order now?`);
      if (confirmation) {
        this.checkoutConfirm = true;
        this.checkConfirm();
      }
    }
  }
  addOrder(): void {
    this.updateCart();
      if (this.cart.items.length > 0) {
        this.order._user._id = this.user._id;
        for (let i=0; i< this.cart.items.length; i++) {
          const book = new BOOK();
          book._book._id = this.cart.items[i].book._id;
          book.quantity = this.cart.items[i].quantity;
          book.price = this.cart.items[i].book.sellingPrice;
          this.order.books.push(book);
        }
        this.order.total = this.cart.payable;
        this.orderService.addOrder(this.order).subscribe(data => { 
          alert(`Da dat hang thanh cong\nThanh tien: ${data.total}\nSo luong sach: ${data.books.length}`);
          this.cartService.removeCart();
        });
      } else {
        alert('You have no item in Shopping Cart');
      }
      
  }
  getUser(): void {
    this.userService.getUsers().subscribe(_ => this.user = _.user);
  }
  updateCart() {
    this.cart.shipping = this.shipping;
    this.cartService.updateCart(this.cart);
  }
}
