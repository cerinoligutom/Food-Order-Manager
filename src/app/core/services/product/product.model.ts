import { Vendor } from '../models';

export type Product = {
    id: number;
    vendor: Vendor;
    name: string;
    price: number;
    image: string;
    isActive: boolean;
}