import { Vendor, Order } from '../models';

export interface Transaction {
    id: number;
    vendor: Vendor;
    description: string;
    delivery_free: number;
    created_at: Date;
    is_fullfilled: boolean;
}
