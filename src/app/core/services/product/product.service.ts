import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { VendorProductsQueryResponse, getVendorProductsQuery } from "./product.query";
import { map } from "rxjs/operators";
import { AddProductInput, ProductMutationResponse, AddProductMutation } from "./product.mutation";


@Injectable()
export class ProductService {

  constructor(
    private apollo: Apollo
  ) { }

  getVendorProducts(vendorId) {
    return this.apollo.watchQuery<VendorProductsQueryResponse>({
      query: getVendorProductsQuery,
      variables: {
        vendorId: vendorId
      }
    }).valueChanges.pipe(
      map(result => result.data.Vendor.Products)
    );
  }

  addProduct(input: AddProductInput) {

    return this.apollo.mutate<ProductMutationResponse>({
      mutation: AddProductMutation,
      variables: {
        addProductInput: input
      }
    }).pipe(
      map(result => result.data.Product)
    );
  }

}
