import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Genre } from '../view-models/genre';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
  params: new HttpParams()
};

@Injectable({
  providedIn: 'root'
})

export class GenreService {
  name:string;
  ten: string;
  genresUrl = 'http://green-web-bookstore.herokuapp.com/api/genres';
  
  constructor(private http: HttpClient) { }
  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.genresUrl);
  }
  addGenre(genre: Genre): Observable<Genre> {
    return this.http.post<Genre>(this.genresUrl, "name="+genre.name, httpOptions);
  }
  deleteGenre (genre: Genre): Observable<Genre> {
    // const id = typeof genre === 'string' ? genre : genre._id;
    const url = `${this.genresUrl}/${genre._id}`;
    return this.http.delete<Genre>(url, httpOptions);
  }
  updateGenre (genre: Genre): Observable<any> {
    return this.http.put(this.genresUrl, "name="+genre.name, httpOptions);
  }
  // getGenre(_id: string): Observable<Genre> {
  //   // TODO: send the message _after_ fetching the hero
  // return of(HEROES.find(hero => hero.id === id));
  // return this.http.get<Genre[]>(this.genresUrl).find(hero => hero.id === id);
  // }
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
