import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieResponse, MovieResults } from '../interface/MovieResponse.interface'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private apiUrlMovies = 'https://api.themoviedb.org/3/discover/movie';
  private apiKey = '01973623ab550268d23a96870f8b6a35';
  private apiURLmovieID = 'https://api.themoviedb.org/3/movie';
  public apiURLGenres = 'https://api.themoviedb.org/3/genre/movie/list';


  constructor(private http: HttpClient) { }

  getAllMovies(): Observable<MovieResults[]> {
    // Definición de un observable
    const UrlMovies = `${this.apiUrlMovies}?api_key=${this.apiKey}`;
    return this.http.get<MovieResponse>(UrlMovies).pipe(
      map((resp: MovieResponse) => resp.results));
  }

  getMoviesGenresSortByPage(page: number, sort_By: string, genre: number | null): Observable<MovieResponse> {
    const moviesWithGenresEndpoint = genre !== null ? `${this.apiUrlMovies}?api_key=${this.apiKey}&page=${page}&sort_by=${sort_By}&with_genres=${genre}`
      : `${this.apiUrlMovies}?api_key=${this.apiKey}&page=${page}&sort_by=${sort_By}`;
    return this.http.get<MovieResponse>(moviesWithGenresEndpoint);
  }
  
  getIDGenres(): Observable<any> {
    const apiURLGenres = `${this.apiURLGenres}?api_key=${this.apiKey}`;
    return this.http.get<any>(apiURLGenres)
}

  getMovieByID(movieID: number): Observable<MovieResults> {
    const moviesById = `${this.apiURLmovieID}/${movieID}?api_key=${this.apiKey}`;
    return this.http.get<MovieResults>(moviesById).pipe(
      map((resp: MovieResults) => resp )); 
  }
}
