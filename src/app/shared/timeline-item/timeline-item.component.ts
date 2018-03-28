import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '@app/components';

@Component({
  selector: 'app-timeline-item',
  templateUrl: './timeline-item.component.html',
  styleUrls: ['./timeline-item.component.scss']
})
export class TimelineItemComponent extends BaseComponent implements OnInit {
  @Input() timelineItem: any;

  constructor() { super(); }

  ngOnInit() {
  }

}
