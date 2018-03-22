import gql from 'graphql-tag';
import { Vendor } from '../models';

export interface AddVendorInput {
  name: String;
  image: String;
}

export interface AddVendorMutationResponse {
  Vendor: Vendor;
}

export const AddVendorMutation = gql`
  mutation addVendor($addVendorInput: AddVendorInput) {
    Vendor: addVendor(input: $addVendorInput) {
      id
      name
      image
    }
  }
`;
