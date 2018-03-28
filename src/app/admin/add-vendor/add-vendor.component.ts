import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseComponent } from '@app/components';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.scss']
})
export class AddVendorComponent extends BaseComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddVendorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { super(); }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onCreateVendor(form: any) {
    this.dialogRef.close(form);
  }

}
