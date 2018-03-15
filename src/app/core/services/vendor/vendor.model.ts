import { ContactNumber, Product } from '../models';

export type Vendor = {
    id: number;
    name: string;
    image: string;
    contactNumbers: ContactNumber[];
    products: Product[]
}