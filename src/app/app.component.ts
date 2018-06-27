import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { User } from './view-models/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // @Input() inputValue: string;
  title = 'app';
  user: User = new User();
  constructor ( private authService: AuthService) {}
  ngOnInit () {
    
  }
  onLogout(): void {
    this.authService.logout();
    
  }
}
