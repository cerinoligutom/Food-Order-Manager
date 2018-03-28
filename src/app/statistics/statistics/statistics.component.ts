import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/components';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent extends BaseComponent implements OnInit {

  constructor() { super(); }

  ngOnInit() {
  }

}
