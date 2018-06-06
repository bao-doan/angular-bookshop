import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// import { AppBootstrapModule } from './app-bootstrap/app-bootstrap.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { AccountComponent } from './account/account.component';
import { SignupComponent } from './signup/signup.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminProductComponent } from './admin-product/admin-product.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    FooterComponent,
    AccountComponent,
    SignupComponent,
    AdminCategoryComponent,
    AdminProductComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
    // AppBootstrapModule,
  ],
  providers: [],
  bootstrap: [AppComponent, AdminComponent]
})
export class AppModule { }
