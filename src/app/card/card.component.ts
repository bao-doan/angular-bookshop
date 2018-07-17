import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../view-models/book';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() book: Book;
  constructor(private cartService: CartService) { }

  ngOnInit() {
  }
  addItem(book: Book, number: number) {
    this.cartService.addItem(book, number);
  }

}
