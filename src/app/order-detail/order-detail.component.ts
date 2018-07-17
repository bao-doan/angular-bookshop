import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../view-models/order';
import { OrderService } from '../services/order.service';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  componentTitle: string = 'Order Details';
  order: Order;
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.getOrder();
  }
  getOrder(): void {
    const id = this.route.snapshot.paramMap.get('_id');
    this.orderService.getOrder(id)
      .subscribe(_ => {this.order = _;});
  }
}
