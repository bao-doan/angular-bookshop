import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Genre } from '../view-models/genre';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' 
})
};

@Injectable({
  providedIn: 'root'
})

export class GenreService {
  name:string;
  ten: string;
  genresUrl = 'https://green-web-bookshop.herokuapp.com/api/genres';
  
  constructor(private http: HttpClient) { }
  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.genresUrl);
  }
  addGenre(genre: Genre): Observable<Genre> {
    return this.http.post<Genre>(this.genresUrl, genre, httpOptions);
  }
  deleteGenre (genre: Genre): Observable<Genre> {
    // const id = typeof genre === 'string' ? genre : genre._id;
    const url = `${this.genresUrl}/${genre._id}`;
    return this.http.delete<Genre>(url, httpOptions);
  }
  /** PUT: update the hero on the server */
  // updateGenre (genre: Genre): Observable<any> {
  //   return this.http.put(this.genresUrl, genre, httpOptions);
  // }
  updateGenre(genre:Genre): Observable<Genre> {
    const url = `${this.genresUrl}/${genre._id}`;
    return this.http.put<Genre>(url, genre, httpOptions )
  }
  searchHeroes(term: string): Observable<Genre[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      // return of([]);
    }
    return this.http.get<Genre[]>(`${this.genresUrl}/?name=${term}`);
  }
  onType(ten): boolean {
    // return !this.name;
    if (this.ten.length == 0) {
      return true;
    }
    else {
      return false;
    }
  } // Note: this onType() makes button disabled when there is no value in Input

}
