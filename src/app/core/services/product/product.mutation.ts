import gql from 'graphql-tag';
import { Product } from "../models";

export interface AddProductInput{
  vendor_id: string;
  name: string;
  price: number;
  image: string;
}

export interface ProductMutationResponse{
  Product: Product;
}

export const AddProductMutation = gql`
  mutation addProduct($addProductInput: AddProductInput) {
    Product: addProduct(input: $addProductInput) {
      id
      name
      price
      image
      is_active
    }
  }
`;
