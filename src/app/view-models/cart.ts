import { Genre } from "./genre";
import { Image } from "./image";

export class Cart {
    quantity: number;
    previousPrice: number;
    sellingPrice: number;

    title: string;
    author: string;
    publisher: string;
    sku: string;
    images: Image = new Image();
}
