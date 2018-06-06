import {Genre} from "./genre";
import {Comment} from "./comment";
import {Image} from "./image";
import {Size} from "./size";

export class Book {
    _id: string;
    shortDescription: string;
    fullDescription: string;
    title: string;
    author: string;
    publisher: string;
    pages: number;
    weight: number;
    sku: string;
    previousPrice: number;
    sellingPrice: number;
    releaseDate: string;
    __v: number;
    comments: Comment[];
    createDate: string;
    images: Image;
    size: Size;
    genre: Genre
}