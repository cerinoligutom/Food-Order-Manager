import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/components';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent extends BaseComponent implements OnInit {
  // PolarArea
  polarAreaChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  polarAreaChartData: number[] = [300, 500, 100, 40, 120];
  polarAreaLegend = true;

  constructor() { super(); }
  polarAreaChartType = 'polarArea';

  // events
  chartClicked(e: any): void {
    console.log(e);
  }

  chartHovered(e: any): void {
    console.log(e);
  }

  ngOnInit() {
  }

}
