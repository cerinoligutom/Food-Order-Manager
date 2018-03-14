export type Vendor = {
    id: number;
    name: string;
    image: string;
    contactNumbers: ContactNumber[];
    products: Product[]
}

export type ContactNumber = {
    vendor: Vendor;
    number: number;
}

export type Product = {
    id: number;
    vendor: Vendor;
    name: string;
    price: number;
    image: string;
    isActive: boolean;
}

export type VendorQuery = {
    allVendors: Vendor[];
}