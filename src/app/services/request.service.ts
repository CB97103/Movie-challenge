import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieResponse, MovieResults } from '../interface/MovieResponse.interface'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private apiUrl = 'https://api.themoviedb.org/3/discover/movie';
  private apiKey = '?api_key=01973623ab550268d23a96870f8b6a35';

  constructor(private http: HttpClient) { }

  getAllMovies(): Observable<MovieResults[]> {

    // Definición de un observable
    return this.http.get<MovieResponse>(this.apiUrl + this.apiKey).pipe(
      map((resp: MovieResponse) => resp.results));
  }
  getMoviesByPage(page: number): Observable<MovieResponse> {
    const url = `${this.apiUrl + this.apiKey}&page=${page}`; // Construye la URL de la solicitud paginada
    return this.http.get<MovieResponse>(url); // Realiza la solicitud HTTP al servidor y devuelve un Observable<MovieResponse>
  }
}
