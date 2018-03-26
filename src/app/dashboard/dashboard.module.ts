import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActivityAreaComponent } from './activity-area/activity-area.component';
import { TransactionModule } from '../transaction/transaction.module';
@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
    TransactionModule
  ],
  exports: [
    TransactionModule
  ],
  declarations: [DashboardComponent, ActivityAreaComponent]
})
export class DashboardModule { }
