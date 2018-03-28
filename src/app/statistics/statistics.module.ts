import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    SharedModule
  ],
  declarations: [StatisticsComponent]
})
export class StatisticsModule { }
