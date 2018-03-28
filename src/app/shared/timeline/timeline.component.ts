import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '@app/components';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent extends BaseComponent implements OnInit {
  @Input() timelineItems: any[] = [];

  constructor() { super(); }

  ngOnInit() {
  }


}
