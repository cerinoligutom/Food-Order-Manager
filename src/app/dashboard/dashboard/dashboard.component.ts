import { Component, OnInit } from '@angular/core';
import { VendorService } from '../../core/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private vendorService: VendorService) { }

  ngOnInit() {
    this.vendorService.getVendors().subscribe(vendors => {
      console.log('vendors:', vendors);
    });
  }
}
