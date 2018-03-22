import gql from 'graphql-tag';
import { Vendor } from "../models";

export type AddVendorInput = {
  name: String;
  image: String;
};

export type AddVendorMutationResponse = {
  Vendor: Vendor;
};

export const AddVendorMutation = gql`
  mutation addVendor($addVendorInput: AddVendorInput) {
    Vendor: addVendor(input: $addVendorInput) {
      id
      name
      image
    }
  }
`;
