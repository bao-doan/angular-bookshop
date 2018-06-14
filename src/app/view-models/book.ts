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
        // images: Image
    ) {
        //  this.title = '';
        //  this.shortDescription = '';
        //  this.fullDescription = fullDescription;
        // this.publisher = publisher;
        // this.author = author;
        // this.pages = pages;
        // this.weight = weight;
        // this.sku = sku;
        // this.previousPrice = previousPrice;
        // this.sellingPrice = sellingPrice;
        // this.releaseDate = releaseDate;
   
        //  this.images = new Image('');
        // this.size = size;
        //this.genre = genre;
    }
}