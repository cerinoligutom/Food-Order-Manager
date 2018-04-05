import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '@app/components';
import { Transaction } from '@app/models';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent extends BaseComponent implements OnInit {
  @Input() timelineItems: Transaction[] = [];

  constructor() { super(); }

  ngOnInit() {
  }


}
