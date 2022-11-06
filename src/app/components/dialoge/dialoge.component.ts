import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialoge',
  templateUrl: './dialoge.component.html',
  styleUrls: ['./dialoge.component.scss'],
})
export class DialogeComponent implements OnInit {
  @Output() updateItemEvent = new EventEmitter<string>();
  productData: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<DialogeComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      id: any;
      flag: string;
      description: string;
      price: number;
    }
  ) {
    this.productData = new FormGroup({
      title: new FormControl(data ? data.title : null, [Validators.required]),
      description: new FormControl(data ? data.description : null, [
        Validators.required,
      ]),
      price: new FormControl(data ? data.price : null, [Validators.required]),
    });
    console.log(data.flag);
  }
  submit() {
    // this.updateItemEvent.emit(JSON.stringify(this.productData.controls));
    this.dialogRef.close({ ...this.productData.controls, id: this.data.id });
  }
  ngOnInit(): void {}
}
