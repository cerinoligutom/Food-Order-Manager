import { ContactNumber, Product } from '../models';

export interface Vendor {
    id: string;
    name: string;
    image: string;
    contactNumbers: ContactNumber[];
}

export interface VendorProducts{
  Products: Product[];
}
