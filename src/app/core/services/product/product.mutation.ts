import gql from 'graphql-tag';
import { Product } from "../models";

export interface AddProductInput{
  vendor_id: string;
  name: string;
  price: number;
  image: string;
}

export interface EditProductInput{
  id: string;
  name: string;
  price: number;
  image: string;
  is_active: boolean;
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
      Vendor {
        id
      }
    }
  }
`;

export const EditProductMutation = gql`
  mutation editProduct($editProductInput: EditProductInput) {
    Product: editProduct(input: $editProductInput) {
      id
      name
      price
      image
      is_active
    }
  }
`;

export const DeleteProductMutation = gql`
  mutation deleteProduct($productId: ID!) {
    isDeletedProduct: deleteProduct(id: $productId)
  }
`;
