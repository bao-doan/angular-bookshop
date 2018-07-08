import { Book } from "./book";

export class Cart {
    items = new Array<Product>();
    book_counted: number = 0;

    discount: number = 0;
    total: number = 0;
    amount: number = this.total - this.discount;

    shipping: number = 0;
    payable: number = 0;
}

// Used for Class Cart
export class Product {
    quantity: number = 0;
    book = new Book();
}
