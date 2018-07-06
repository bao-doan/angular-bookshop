import { Book } from "./book";

export class Cart {
    items = new Array<Product>();
    discount: number = 0;
    total: number = 0;
    amount: number = this.total - this.discount;
}
// Below are additional Classes used for Cart Class
export class Product {
    quantity: number = 0;
    book = new Book();
}
