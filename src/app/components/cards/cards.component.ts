import { Component, OnInit, Input } from '@angular/core';
import { MovieResults, Genres } from 'src/app/interface/MovieResponse.interface';
import { RequestService } from 'src/app/services/request.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  @Input() genres: Genres[] = [];

  movieList: MovieResults[] = [];
  errorMessage = '';
  currentPage: number = 1;
  currentSortBy: string = '';
  currentGenre: number | null = null;

  constructor(private requestService: RequestService, private router: Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.requestService.getAllMovies().subscribe((response) => {
      this.movieList = response;
      console.log("getData:", response)
    },
      (error) => {
        this.errorMessage = error
      }
    )
  };

  // Metodo que obtiene las peliculas de una página especifica, ordenamiento y genero
  getMovies(page: number, sort_By: string, genre: number | null = null): void {
    console.log("Sorting by:", sort_By);
    console.log("Genre selected:", genre);
    this.requestService.getMoviesGenresSortByPage(page, sort_By, genre).subscribe(
      (response) => {
        console.log("Respuesta del servicio:", response);
        this.movieList = response.results;
      },
      (error) => {
        this.errorMessage = error;
        console.error('Error al cargar las películas:', error);
      }
    );
  };

  // getGenreName(genreIds : number[]) {
  //   return genreIds.map(genreId => {
  //     const genre = this.genres.find(g => g.id === genreId);
  //     console.log('generoId error', genre)
  //     return genre ? genre.name : 'Desconocido';
  //   });
  // }

  resetFiltersevent() {
    const sortBy = "popularity.desc";
    const genre = null;

    this.requestService.getMoviesGenresSortByPage(1, sortBy, genre).subscribe(
      (response) => {
        this.movieList = response.results;
      },
      (error) => {
        console.error('Error al cargar las películas:', error);
      }
    );
  }

   navigateToDetails(id: number) {
    console.log("navigate", this.navigateToDetails)
    this.router.navigate(['details', id]);
  }
}
