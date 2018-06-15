import { Component, OnInit } from '@angular/core';
import { Genre } from '../view-models/genre';
import { GenreService } from '../services/genre.service';
import { Book } from '../view-models/book';
import { BookService } from '../services/book.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  genres: Genre[];
  books: Book[];
  constructor(private genreService: GenreService, private bookService: BookService) { }

  ngOnInit() {
    this.getGenres();
    this.getBooks();
  }
  getGenres(): void {
    this.genreService.getGenres().subscribe(_ => this.genres = _);
  }
  getBooks(): void {
    this.bookService.getBooks().subscribe(_ => this.books = _);
  }
}
