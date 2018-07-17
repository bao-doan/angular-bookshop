import { User } from './user';
import { Book } from './book';
export class Order {
    _user: UserOrder = new UserOrder();
    books: BOOK[] = new Array<BOOK>();
    total: number;
    note: string;
}

export class BOOK {
    _book: BookOrder = new BookOrder();
    quantity: number;
    price: number;
}

export class UserOrder {
    _id: string;
    email: string;
}
export class BookOrder {
    _id: string;
    title: string;
}