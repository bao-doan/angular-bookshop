import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRegister } from '../view-models/user.register';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  objectUser: UserRegister = new UserRegister();
  checkbox: boolean = false;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'first': new FormControl(this.objectUser.first, [Validators.required]),
      'last': new FormControl(this.objectUser.last, [Validators.required]),
      'phone': new FormControl(this.objectUser.phone, [Validators.required]),
      'email': new FormControl(this.objectUser.email, [Validators.required]),
      'password': new FormControl(this.objectUser.password, [Validators.required]),
      'confirm': new FormControl(this.objectUser.password, [Validators.required]),
      'check': new FormControl(this.checkbox, [Validators.required]),
    });
  }
  get first() { return this.registerForm.get('first'); }
  get last() { return this.registerForm.get('last'); }
  get phone() { return this.registerForm.get('phone'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirm() { return this.registerForm.get('confirm'); }
  get check() { return this.registerForm.get('check'); }

  onSaveRegister(): void {
    let x = this.objectUser;
    let y = this.registerForm.value;
    if (y.check == false) {
      alert('You have to agree with our Terms of Service and Privacy Policy');
    } else if (y.password !== y.confirm) {
      alert(`You have to confirm correct password that you've typed`);
    } else {
      x.first = y.first;
      x.last = y.last;
      x.phone = y.phone;
      x.email = y.email;
      x.password = y.password;
      this.addUsers();
      if (x.first !== null) {
        alert(`Sucessfully registerd: ${x.first} ${x.last} as a User`);
      }
    }
  }
  addUsers(): void {
    this.userService.addUser(this.objectUser).subscribe();
  }
  // For toggle Show or Hide password input
  show: string = "password";
  value: number = 0;
  onToggle(): void {
    if (this.value % 2 == 1) {
      this.show = "password";
      this.value = 0;
    } else {
      this.show = "text";
      this.value = 1;
    }
    
  }
}
