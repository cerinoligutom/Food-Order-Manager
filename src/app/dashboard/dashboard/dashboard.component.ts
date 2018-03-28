import { Component, OnInit } from '@angular/core';
import { VendorService } from '../../core/services';
import { BaseComponent } from '@app/components';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(private vendorService: VendorService) { super(); }

  ngOnInit() {
    this.vendorService.getVendors().subscribe(vendors => {
      console.log('vendors:', vendors);
    });
  }
}
