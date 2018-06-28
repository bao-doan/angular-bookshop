import { Component, OnInit, Input } from '@angular/core';
import { Genre } from '../view-models/genre';
import { GenreService } from '../services/genre.service';
import { UserService } from '../services/user.service';
import { User } from '../view-models/user';
import { Users } from '../view-models/users';
import { first } from 'rxjs/operators';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private genreService: GenreService, private userService: UserService) { }
  ngOnInit() {
  }
}
