import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Vendor } from './vendor.model';
import { map } from 'rxjs/operators';
import {
  VendorQuery, VendorQueryResponse
} from './vendor.query';
import {
  AddVendorInput,
  AddVendorMutation, AddVendorMutationResponse
} from './vendor.mutation';

@Injectable()
export class VendorService {
  constructor(private apollo: Apollo) { }

  getVendors() {
    return this.apollo.watchQuery<VendorQueryResponse>({
      query: VendorQuery
    })
    .valueChanges
    .pipe(
      map(result => result.data.Vendors)
    );
  }

  addVendor(input: AddVendorInput) {
    return this.apollo.mutate<AddVendorMutationResponse>({
      mutation: AddVendorMutation,
      variables: {
        addVendorInput: input
      }
    })
    .pipe(
      map(result => result.data.Vendor)
    );
  }
}
