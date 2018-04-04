import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardModule } from '../dashboard/dashboard.module';
import { StatisticsModule } from '../statistics/statistics.module';
import { UserProfileModule } from '../user-profile/user-profile.module';
import { HomeComponent } from './home/home.component';
import { AdminModule } from '../admin/admin.module';
import { TransactionModule } from '../transaction/transaction.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => DashboardModule
      },
      {
        path: 'statistics',
        loadChildren: () => StatisticsModule
      },
      {
        path: 'user',
        loadChildren: () => UserProfileModule
      },
      {
        path: 'admin',
        loadChildren: () => AdminModule
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
export class HomeRoutingModule { }
