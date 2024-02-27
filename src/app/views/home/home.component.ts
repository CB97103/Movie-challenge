import { Component, ViewChild } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Genres, MovieResponse, MovieResults } from 'src/app/interface/MovieResponse.interface';
import { CardsComponent } from 'src/app/components/cards/cards.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  isHomeView: boolean = true; 
  @ViewChild(CardsComponent)
  cardsComponent!: CardsComponent; //Declara una propiedad llamada cardsComponent

  currentPage: number = 1;
  sort_By: string = "popularity.desc"; 
  genre: number | null = null;
  apiResponse: MovieResponse[] = [];
  moviesResponse: MovieResults[] = [];



  constructor(private requestService: RequestService) { }

  ngOnInit() {
    this.loadMovies(this.currentPage, this.sort_By, this.genre);
  }

  loadMovies(page:number, sort_By: string, genre: number | null = null): void { 
    this.currentPage = page;
    this.sort_By = sort_By;
    this.genre = genre;
    console.log("Sort_By:", this.sort_By);
    console.log("load genre:", this.genre);
    this.requestService.getMoviesGenresSortByPage(this.currentPage, this.sort_By, this.genre)
      .subscribe((response: MovieResponse) => { 
        console.log("respuesta:", response)
         this.moviesResponse = response.results
         this.cardsComponent.getMovies(this.currentPage, sort_By, genre);
        console.log("loadMovies recibe", this.moviesResponse);
            });
  }
// Maneja el cambio de ordenamiento, filtrado y carga las películas con el nuevo criterio
  handleOrderChange(selectedOrder: string): void {
    this.sort_By = (selectedOrder)
    this.loadMovies(this.currentPage, this.sort_By, this.genre);
  }
  handleGenreChange(selectedGenre: string): void {
   this.genre = parseInt(selectedGenre);
    this.loadMovies(this.currentPage, this.sort_By, this.genre);
  }

 // Restablece los filtros y actualizar las películas en CardsComponent
  resetFilters(): void {
    this.cardsComponent.resetFiltersevent();
  }
}
