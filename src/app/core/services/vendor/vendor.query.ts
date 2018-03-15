import gql from 'graphql-tag';
import { Vendor } from "../models";

export type VendorQueryResponse = {
    Vendors: Vendor[];
}

export const VendorQuery = gql`
    query getVendors {
        Vendors {
            id
            name
            image
            ContactNumbers {
                number
            }
            Products {
                name
                price
                image
            }
        }
    }
`;
