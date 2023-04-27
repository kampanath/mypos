export class Product {
    name: string;
    price: number;
    stock: number;
    image: any;
    qty: number;
    productId: number;
    created: Date
}

export interface ProductAll{
    result: Product[],
    message: string
}

export interface ProductBY{
    result: Product,
    message: string
}
