import { NgModule } from '@angular/core';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';

import { SharedModule } from '../shared/shared.module';
import { TransactionComponent } from './transaction/transaction.component';


@NgModule({
  imports: [
    SharedModule,
    TransactionRoutingModule
  ],
  declarations: [TransactionFormComponent, TransactionComponent]
})
export class TransactionModule { }
