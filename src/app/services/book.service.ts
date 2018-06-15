import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../view-models/book';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})


export class BookService {
  private booksUrl = 'http://green-web-bookstore.herokuapp.com/api/books';

  constructor(private http: HttpClient) { }
  /** GET api-s from the server */
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl);
  }
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.booksUrl, book, httpOptions);
  }
  deleteBook (book: Book): Observable<Book> {
    // const id = typeof genre === 'string' ? genre : genre._id;
    const url = `${this.booksUrl}/${book._id}`;
    return this.http.delete<Book>(url, httpOptions);
  }
  updateBook(book: Book): Observable<Book> {
    const url = `${this.booksUrl}/${book._id}`;
    return this.http.put<Book>(url, book, httpOptions )
  }
  /** GET hero by id. Will 404 if id not found */
getBook(id: string): Observable<Book> {
  const url = `${this.booksUrl}/${id}`;
  return this.http.get<Book>(url);
}
}
