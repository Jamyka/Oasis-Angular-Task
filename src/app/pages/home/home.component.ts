import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: any = [];
  product: any;
  // dialogFlag: any;
  constructor(private api: ApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.api.getProducts().subscribe({
      next: (res) => {
        let localItems = [];
        console.log(res);
        localItems = res.products;
        for (let i = 0; i <= 5; i++) {
          this.products.push(localItems[i]);
        }
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  editItem(data: any) {
    let product = this.products.find((item: any) => {
      return item.id == data.id;
    });
    console.log('From Home Page: ', product);
    product.title = data.title;
    product.description = data.description;
    product.price = data.price;
  }
  deleteItem(id: any) {
    this.products = this.products.filter((item: any) => {
      return item.id != id;
    });
  }
}
