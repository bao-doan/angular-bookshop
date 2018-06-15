import { Component, OnInit } from '@angular/core';
import { Genre } from '../view-models/genre';
import { GenreService } from '../services/genre.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  genres: Genre[];
  constructor(private genreService: GenreService) { }

  ngOnInit() {
    this.getGenres();
    if (this.genres !== null) {
      alert(`Da lay genre thanh cong`);
    }
  }
  getGenres(): void {
    this.genreService.getGenres().subscribe(_ => this.genres = _);
  }
}
