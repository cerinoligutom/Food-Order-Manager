import { Component, OnInit } from '@angular/core';
import { VendorService } from '../../core/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardComponent implements OnInit {
  fillerNav = Array(5).fill(0).map((_, i) => `Nav Item ${i + 1}`);



  constructor(private vendorService: VendorService) { }

  ngOnInit() {
    this.vendorService.getVendors().subscribe(vendors => {
      console.log('vendors:', vendors);
    });
  }
};
