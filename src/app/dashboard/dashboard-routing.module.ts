import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard-home/dashboard-home.component';
import { ActivityAreaComponent } from './activity-area/activity-area.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path:'',
        redirectTo: 'activity',
        pathMatch: 'full'
      },
      {
        path: 'activity',
        component: ActivityAreaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
