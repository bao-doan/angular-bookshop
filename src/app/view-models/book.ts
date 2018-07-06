import { Genre } from "./genre";
import { Comment } from "./comment";
import { Image } from "./image";
import { Size } from "./size";

export class Book {
    _id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    author: string;
    publisher: string;
    pages: number;
    weight: number;
    sku: string;
    previousPrice: number;
    sellingPrice: number;
    releaseDate: string;
    comments: Comment[];
    createDate: string;
    images: Image = new Image();
    size: Size = new Size();
    genre: Genre = new Genre('');

    constructor(
    ) {

    }
}