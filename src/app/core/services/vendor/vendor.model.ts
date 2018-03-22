import { ContactNumber, Product } from '../models';

export interface Vendor {
    id: number;
    name: string;
    image: string;
    contactNumbers: ContactNumber[];
    products: Product[];
}
