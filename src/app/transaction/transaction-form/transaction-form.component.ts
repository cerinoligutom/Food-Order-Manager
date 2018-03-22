import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OptionItem } from '../../shared/custom-input/custom-input.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})


export class TransactionFormComponent implements OnInit {

  form: any;

  foods: OptionItem[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  constructor(
    public dialogRef: MatDialogRef<TransactionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  // onSubmit(form) {
  //   // let foods = data.map(x=> <OptionItem>{value: x.id, viewValue: x.name});
  //   console.log(form);
  // }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createTransaction(form) {
    return form;
  }

}
