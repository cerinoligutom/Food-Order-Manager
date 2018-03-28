import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ManageProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  onNoClick(): void{
    this.dialogRef.close(false);
  }

  onEditProduct(form: any){
    this.dialogRef.close(form)
  }

  onDeleteProduct(id){
    this.dialogRef.close(id);
  }

}
