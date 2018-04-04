import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  {
    path: ':id',
    component: TransactionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
