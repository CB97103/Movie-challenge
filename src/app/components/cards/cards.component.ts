import { Component, OnInit } from '@angular/core';
import { MovieResponse } from 'src/app/interface/MovieResponse.interface';
import { RequestService } from 'src/app/services/request.service';
import { MovieResults } from 'src/app/interface/MovieResponse.interface';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  movieList: MovieResults[] = [];
  errorMessage = '';

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {

    this.requestService.getAllMovies().subscribe((response) => {
      this.movieList = response;
      console.log(response)
    },
      (error) => {
        this.errorMessage = error
      }
    )
  };
  // Metodo que obtiene las peliculas de una página especifica
  getMovies(page: number): void {
    this.requestService.getMoviesByPage(page).subscribe(
      (response) => {
        this.movieList = response.results;
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
