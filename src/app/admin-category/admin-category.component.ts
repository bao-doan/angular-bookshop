import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GenreService } from '../services/genre.service';
import { Genre } from '../view-models/genre';
@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {
  genres: Genre[];
  name: string;
  selectedGenre: Genre;
  selectedDelete: Genre;
  objectGenre: Genre;
  constructor(private genreService: GenreService, private location: Location, private route:ActivatedRoute) { }

  ngOnInit() {
    // this.getGenres();
  }
  onSelect(genre):void {
    this.selectedGenre = genre;
  }
  onSelectDelete(genre):void {
    this.selectedDelete = genre;
  }
  
  getGenres(): void {
    this.genreService.getGenres().subscribe(z => this.genres = z);
  };
  addGenre(): void {
    if (this.name.length > 0) {
      let genre = new Genre(this.name);

      this.genreService.addGenre(genre).subscribe(_ => {
        this.name = "";
        this.genres.push(_);
      });
    }
  }
  deleteGenre(genre: Genre): void {
    this.genres = this.genres.filter(h => h !== genre);
    this.genreService.deleteGenre(genre).subscribe(
      
    );
  }
  // onType(name): boolean {
  //   return this.genreService.onType(name);
  // }
}
