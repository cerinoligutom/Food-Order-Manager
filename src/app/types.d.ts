export interface Vendor {
    id: number;
    name: string;
    image: string;
    contactNumbers: ContactNumber[];
    products: Product[];
}

export interface ContactNumber {
    vendor: Vendor;
    number: number;
}

export interface Product {
    id: number;
    vendor: Vendor;
    name: string;
    price: number;
    image: string;
    isActive: boolean;
}

export interface VendorQuery {
    allVendors: Vendor[];
}
