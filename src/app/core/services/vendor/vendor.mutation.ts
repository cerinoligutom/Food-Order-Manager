import gql from 'graphql-tag';
import { Vendor } from '../models';

export interface AddVendorInput {
  name: string;
  image: string;
}

export interface EditVendorInput {
  id: string;
  name: string;
  image: string;
}

export interface VendorMutationResponse {
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

export const EditVendorMutation = gql`
  mutation editVendor($editVendorInput: EditVendorInput) {
    Vendor: editVendor(input: $editVendorInput) {
      id
      name
      image
    }
  }
`;
