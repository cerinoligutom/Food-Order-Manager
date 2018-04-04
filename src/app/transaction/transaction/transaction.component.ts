import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '@app/services';
import { BaseComponent } from '@app/components';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent extends BaseComponent implements OnInit {

  transaction: any;

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService
  ) { super(); }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.transactionService.getTransaction(params['id']).subscribe(transaction => {
        console.log('transaction ', transaction);
        this.transaction = transaction;
      })
    });
  }

}
