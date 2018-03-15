import { NgModule } from '@angular/core';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    TransactionRoutingModule,
    SharedModule
  ],
  declarations: [TransactionFormComponent]
})
export class TransactionModule { }
