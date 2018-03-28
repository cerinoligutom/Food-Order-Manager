import { Transaction } from '../models';

export interface Order {
    id: number;
    comments: string;
    isFullyPaind: boolean;
    transaction: Transaction;
}
