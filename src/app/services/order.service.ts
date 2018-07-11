import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../view-models/order';
import { Book } from '../view-models/book';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersUrl = 'http://green-web-bookshop.herokuapp.com/api/orders';
  constructor( private http: HttpClient ) { }
  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.ordersUrl, order, httpOptions);
  }
}
