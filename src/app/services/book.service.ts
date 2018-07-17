import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Book, Banner } from '../view-models';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})


export class BookService {
  private booksUrl = 'https://green-web-bookshop.herokuapp.com/api/books';
  private bannersUrl = 'https://green-web-bookstore.herokuapp.com/api/banners';
  constructor(
    private http: HttpClient,
    private router: Router) { }
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl);
  }
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.booksUrl, book, httpOptions);
  }
  deleteBook(book: Book): Observable<Book> {
    // const id = typeof genre === 'string' ? genre : genre._id;
    const url = `${this.booksUrl}/${book._id}`;
    return this.http.delete<Book>(url, httpOptions);
  }
  updateBook(book: Book): Observable<Book> {
    const url = `${this.booksUrl}/${book._id}`;
    return this.http.put<Book>(url, book, httpOptions)
  }
  getBook(id: string): Observable<Book> {
    const url = `${this.booksUrl}/${id}`;
    return this.http.get<Book>(url);
  }
  // Banners
  getBanners(): Observable<Banner[]> {
    return this.http.get<Banner[]>(this.bannersUrl);
  }
  

}
