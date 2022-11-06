import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';

import { ProductsComponent } from './pages/products/products.component';
import { AddEditProductComponent } from './pages/add-edit-product/add-edit-product.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LocalService } from './services/local.service';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { CardTileComponent } from './components/card-tile/card-tile.component';

import { EllipsisPipe } from './ellipsis.pipe';
import { DialogeComponent } from './components/dialoge/dialoge.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    AddEditProductComponent,
    PageNotFoundComponent,
    CardTileComponent,
    EllipsisPipe,
    DialogeComponent,
    ProductDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatGridListModule,
    MatDialogModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private localStore: LocalService) {
    // localStore.login();
    if (localStore.isAuth()) {
      // console.log(localStore.isAuth(), ' From The App Component');
    } else {
      localStore.logout();
    }
  }
}
