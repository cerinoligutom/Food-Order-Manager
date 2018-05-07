import { NgModule } from '@angular/core';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';

import { SharedModule } from '../shared/shared.module';
import { TransactionComponent } from './transaction/transaction.component';
import { AddOrderFormComponent } from './add-order-form/add-order-form.component';
import { EditOrderItemFormComponent } from './edit-order-item-form/edit-order-item-form.component';
import { UpdateOrderComponent } from './update-order/update-order.component';


@NgModule({
  imports: [
    SharedModule,
    TransactionRoutingModule
  ],
  declarations: [TransactionFormComponent, TransactionComponent, AddOrderFormComponent, EditOrderItemFormComponent, UpdateOrderComponent, UpdateOrderComponent],
  entryComponents: [AddOrderFormComponent, UpdateOrderComponent, EditOrderItemFormComponent]
})
export class TransactionModule { }
