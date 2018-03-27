import { Vendor } from '../models';

export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    is_active: boolean;
}
