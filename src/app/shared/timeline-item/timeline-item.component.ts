import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '@app/components';
import { Router } from '@angular/router';
import { Transaction } from '@app/models';

@Component({
  selector: 'app-timeline-item',
  templateUrl: './timeline-item.component.html',
  styleUrls: ['./timeline-item.component.scss']
})
export class TimelineItemComponent extends BaseComponent implements OnInit {
  @Input() timelineItem: Transaction;

  constructor(
    private router: Router,
  ) { super(); }

  ngOnInit() {
  }

  goToTransactionPage() {
    this.router.navigate(['/transaction', this.timelineItem.id]);
  }

}
