import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { AccountComponent } from '../account/account.component';
import { SignupComponent } from '../signup/signup.component';
import { AdminComponent } from '../admin/admin.component';
import { AdminCategoryComponent } from '../admin-category/admin-category.component';
import { AdminProductComponent } from '../admin-product/admin-product.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  {path: 'admin', component: AdminComponent },
  {path: 'home', component: HomeComponent },
  {path: 'admin-category', component: AdminCategoryComponent },
  {path: 'admin-product', component: AdminProductComponent },
  {path: 'account', component: AccountComponent },
  {path: 'signup', component: SignupComponent }
  
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
