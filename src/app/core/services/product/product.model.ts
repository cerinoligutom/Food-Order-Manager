import { Vendor } from '../models';

export interface Product {
    id: number;
    vendor: Vendor;
    name: string;
    price: number;
    image: string;
    isActive: boolean;
}
