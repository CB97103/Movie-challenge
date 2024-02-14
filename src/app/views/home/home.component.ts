import { Component, ViewChild } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { MovieResponse, MovieResults } from 'src/app/interface/MovieResponse.interface';
import { CardsComponent } from 'src/app/components/cards/cards.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  @ViewChild(CardsComponent)
  cardsComponent!: CardsComponent; //Declara una propiedad llamada cardsComponent

  currentPage: number = 1;
  moviesResponse: MovieResults[] = [];

  constructor(private requestService: RequestService) { }

  // Metodo que se activa cada vez que cambia la página
  onPageChange(page: number): void {
    this.currentPage = page;
    this.requestService.getMoviesByPage(this.currentPage)
      .subscribe((data: MovieResponse) => {
        console.log("subscribe recibe", data);
        this.moviesResponse = data.results; // Asignamos la respuesta del servicio a la lista de películas
        console.log("movies", this.moviesResponse);
        this.cardsComponent.getMovies(this.currentPage); // Solicita al componente CardsComponent que cargue las películas correspondientes a la página actual
      })
  }
}
