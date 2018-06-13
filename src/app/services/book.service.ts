import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../view-models/book';
import { Banner } from '../view-models/banner';
@Injectable({
  providedIn: 'root'
})


export class BookService {
  // books: Book[];
  private booksUrl = 'https://green-web-bookshop.herokuapp.com/api/books';
  // private bannersUrl = 'https://green-web-bookstore.herokuapp.com/api/banners';

  constructor(private http: HttpClient) { }
  /** GET api-s from the server */
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl);
  }
  // getBanners(): Observable<Banner[]> {
  //   return this.http.get<Banner[]>(this.bannersUrl);
  // }
 
}
