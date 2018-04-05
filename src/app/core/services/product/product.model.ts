import { Vendor } from '../models';

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    is_active: boolean;
}
