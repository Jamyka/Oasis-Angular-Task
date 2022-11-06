import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LocalService } from 'src/app/services/local.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogeComponent } from 'src/app/components/dialoge/dialoge.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private localStore: LocalService,
    private router: Router,
    private api: ApiService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  openDialog(product: any) {
    const dialogRef = this.dialog.open(DialogeComponent, {
      width: '40%',
      data: {
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        flag: 'add',
      },
    });

    dialogRef.afterClosed().subscribe((data) => this.addItem(data));
  }

  addItem(data: any) {
    const newItemdata = {
      title: data.title.value,
      description: data.description.value,
      price: data.price.value,
    };
    this.api.addProduct(newItemdata).subscribe({
      next: (res) => {
        console.log(res);
        this._snackBar.open('Product Added Successfully', 'Done', {
          duration: 3000,
        });
      },
      error(err) {
        console.log(err);
      },
    });
  }

  logout() {
    console.log('first');
    this.localStore.logout();
    this.router.navigate(['login']);
  }
}
