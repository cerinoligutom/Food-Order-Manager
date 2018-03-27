import gql from 'graphql-tag';
import { Product, VendorProducts } from '../models';

export interface VendorProductsQueryResponse{
  Vendor: VendorProducts;
}

export interface ProductQueryResponse {
  Products: Product[];
}

export const getVendorProductsQuery = gql`
query getVendorProductsQuery($vendorId: ID!){
  Vendor(id: $vendorId){
    Products{
      id
      name
      price
      image
      is_active
    }
  }
}
`;
