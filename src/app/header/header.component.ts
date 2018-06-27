import { Component, OnInit } from '@angular/core';
import { Genre } from '../view-models/genre';
import { GenreService } from '../services/genre.service';
import { UserService } from '../services/user.service';
import { User } from '../view-models/user';
import { Users } from '../view-models/users';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  genres: Genre[];
  user: User = new User();
  constructor(private genreService: GenreService, private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
    this.getGenres();
  }
  getGenres(): void {
    this.genreService.getGenres().subscribe(_ => this.genres = _);
  }
  getUsers(): void {
    this.userService.getUsers().subscribe(_ => this.user = _.user )
  }
}
