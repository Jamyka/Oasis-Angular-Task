import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  data: any = [];
  length = 100;
  pageSize = 6;
  skip = 0;
  pageSizeOptions: number[] = [6, 7, 8];
  pageEvent?: PageEvent;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllProducts({ pageSize: this.pageSize });
  }

  getAllProducts(e: any) {
    this.pageSize = e.pageSize || this.pageSize;
    this.http
      .get<any>(
        `https://dummyjson.com/products?limit=${this.pageSize}&skip=${this.skip}`
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.data = res.products;
          this.length = res.total;
          this.skip += e.pageSize;
        },
        error(err) {
          console.log(err);
        },
      });
  }
}
