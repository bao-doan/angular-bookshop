import { User } from './user';
import { Book } from './book';
export class Order {
    _user: string = new User()._id;
    books: BOOK[] = new Array<BOOK>();
    total: number;
    note: string;
}

export class BOOK {
    _book: string = new Book()._id;
    quantity: number;
    price: number;
}