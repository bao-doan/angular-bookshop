import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Genre } from '../view-models/genre';
import { GenreService } from '../services/genre.service';
import { Book } from '../view-models/book';
import { BookService } from '../services/book.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  genres: Genre[];
  books: Book[];
  book: Book;
  constructor(
    private genreService: GenreService, 
    private bookService: BookService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getGenres();
    this.getBooks();
    this.getBook();
  }
  getGenres(): void {
    this.genreService.getGenres().subscribe(_ => this.genres = _);
  }
  getBooks(): void {
    this.bookService.getBooks().subscribe(_ => this.books = _);
  }
  getBook(): void {
    const id = this.route.snapshot.paramMap.get('_id');
    this.bookService.getBook(id)
      .subscribe(_ => this.book = _);
  }
}
