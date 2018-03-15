import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Vendor } from './vendor.model';
import { map } from 'rxjs/operators';
import { VendorQuery, VendorQueryResponse} from './vendor.query';
import gql from 'graphql-tag';

@Injectable()
export class VendorService {
  vendors: Vendor[];

  constructor(private apollo: Apollo) { }

  getVendors(){
    this.apollo.watchQuery<VendorQueryResponse>({
      query: VendorQuery
    })
    .valueChanges
    .pipe(
      map(result => result.data.Vendors)
    )
    .subscribe(vendors => {
      this.vendors = vendors;
    });
    console.log('asdf');
  }
}
