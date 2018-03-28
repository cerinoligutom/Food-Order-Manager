import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { VendorProductsQueryResponse, getVendorProductsQuery } from "./product.query";
import { map } from "rxjs/operators";
import { AddProductInput, ProductMutationResponse, AddProductMutation, EditProductInput, EditProductMutation, DeleteProductMutation } from "./product.mutation";


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

  editProduct(input: EditProductInput) {
    return this.apollo.mutate<ProductMutationResponse>({
      mutation: EditProductMutation,
      variables: {
        editProductInput: input
      }
    }).pipe(
      map(result => result.data.Product)
    );
  }

  deleteProduct(productId) {
    return this.apollo.mutate<ProductMutationResponse>({
      mutation: DeleteProductMutation,
      variables: {
        productId: productId
      }
    }).pipe(
      map(result => result.data)
    );
  }


}
