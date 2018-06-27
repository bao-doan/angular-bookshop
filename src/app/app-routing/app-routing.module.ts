import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { AccountComponent } from '../account/account.component';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { CartComponent } from '../cart/cart.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ContactComponent } from '../contact/contact.component';
import { AboutComponent } from '../about/about.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full' },
  {path: 'home', component: HomeComponent },
  {path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  {path: 'register', component: RegisterComponent },
  {path: 'login', component: LoginComponent },
  {path: 'cart', component: CartComponent },
  {path: 'checkout', component: CheckoutComponent,canActivate: [AuthGuard] },
  {path: 'order-detail', component: OrderDetailComponent, canActivate: [AuthGuard] },
  {path: 'product-list', component: ProductListComponent },
  {path: 'product-detail/:_id', component: ProductDetailComponent },
  {path: 'contact', component: ContactComponent },
  {path: 'about', component: AboutComponent }
  
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
