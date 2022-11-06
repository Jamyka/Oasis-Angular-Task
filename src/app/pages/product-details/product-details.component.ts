import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productId: any;
  data: any;
  slideIndex: number = 1;

  constructor(private router: ActivatedRoute, private api: ApiService) {
    router.params.subscribe({
      next: (params) => {
        this.productId = params['id'];
      },
      error(err) {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.getItemDetails(this.productId);
  }

  getItemDetails(id: any) {
    console.log(id);
    this.api.getProductById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.data = res;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
