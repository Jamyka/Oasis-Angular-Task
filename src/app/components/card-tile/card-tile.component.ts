import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogeComponent } from 'src/app/components/dialoge/dialoge.component';

@Component({
  selector: 'app-card-tile',
  templateUrl: './card-tile.component.html',
  styleUrls: ['./card-tile.component.scss'],
})
export class CardTileComponent implements OnInit {
  product: any;
  dialogFlag: any;

  constructor(
    private router: Router,
    private api: ApiService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  @Input() item: any;
  @Output() deleteItemEvent = new EventEmitter<string>();
  @Output() editItemEvent = new EventEmitter<string>();

  getItemDetails(e: Event, id: any, flag: string) {
    e.stopPropagation();
    this.api.getProductById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.dialogFlag = flag;
        this.product = res;
        this.openDialog(this.product);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  openDialog(product: any) {
    const dialogRef = this.dialog.open(DialogeComponent, {
      width: '40%',
      data: {
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        flag: this.dialogFlag,
      },
    });

    dialogRef.afterClosed().subscribe((data) => this.editItem(data));
  }

  viewItem(id: any) {
    this.router.navigate([`product/${id}`]);
  }

  editItem(data: any) {
    if (data) {
      this.api
        .updateProduct(data.id, {
          title: data.title.value,
          description: data.description.value,
          price: parseInt(data.price.value),
        })
        .subscribe({
          next: (res) => {
            console.log(res);
            this.editItemEvent.emit(res);
          },
          error: (e) => {
            console.log(e);
          },
        });
    } else {
      console.log('No Data');
    }
  }

  deleteItem(e: Event, id: any) {
    e.stopPropagation();
    this.api.deleteProduct(id).subscribe({
      next: (res) => {
        if (res.isDeleted) {
          this.deleteItemEvent.emit(id);
        }
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
