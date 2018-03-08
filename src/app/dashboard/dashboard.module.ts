import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard-home/dashboard-home.component';
import { ActivityAreaComponent } from './activity-area/activity-area.component';



@NgModule({
  imports: [
    DashboardRoutingModule,
    SharedModule
  ],
  declarations: [DashboardComponent, ActivityAreaComponent]
})
export class DashboardModule {}
