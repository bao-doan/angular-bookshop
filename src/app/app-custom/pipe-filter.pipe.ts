import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../view-models/book';
@Pipe({
  name: 'pipeFilter'
})
export class PipeFilterPipe implements PipeTransform {

  transform(books: Book[], title: string, args?: any): any {
    if (!title) {
      return null;
    } else {
      if (title) {
        books = books.filter(b => {
          return b.title.toLowerCase().toString().indexOf(title.toLowerCase()) != -1;
        });
        return books;
      }
    }
  }
}
