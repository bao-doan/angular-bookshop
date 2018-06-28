import { Component, OnInit, OnChanges, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { User } from './view-models/user';
import { Genre } from './view-models/genre';
import { UserService } from './services/user.service';
import { GenreService } from './services/genre.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loginStatus: boolean = false;
  genres: Genre[];
  user: User = new User();
  currentuser = JSON.parse(localStorage.getItem('currentUser'));
  constructor ( 
    private authService: AuthService,
    private userService: UserService,
    private genreService: GenreService
  ) {}
  ngOnInit () {
    this.getGenres();
    if (this.currentuser) {
      this.loginStatus = true;
      this.getUsers();
    } else {}
  }
  mySetTrue(event:boolean): any {
    this.loginStatus = event;
    this.getUsers();
    alert(`Da evoke mySetTrue()\n event = ${event}`);
  }
  getGenres(): void {
    this.genreService.getGenres().subscribe(_ => this.genres = _);
  }
  getUsers(): void {
    if(this.loginStatus == true) {
      this.userService.getUsers().subscribe(_ => 
        {
          this.user = _.user;
          console.log(`AppComponent: getUsers(): ${this.user.first}`);
        })
    } else {
      this.user = new User();
      alert(`AppComponent: getUsers() says ${this.user.first}`);
      console.log(`AppComponent getUsers(): Chua Login`);
    }
  }
  onLogout(): void {
    this.authService.logout();
    this.loginStatus = false;
    this.getUsers();
    alert(`AppComponent: onLogout() says loginStatus = ${this.loginStatus}`);
  }
}
