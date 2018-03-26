import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActivityAreaComponent } from './activity-area/activity-area.component';
import { TransactionModule } from '../transaction/transaction.module';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'activity',
        pathMatch: 'full'
      },
      {
        path: 'activity',
        component: ActivityAreaComponent
      },
      {
        path: 'transaction',
        loadChildren: () => TransactionModule
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
