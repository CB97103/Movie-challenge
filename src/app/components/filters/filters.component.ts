import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Genres } from 'src/app/interface/MovieResponse.interface';
import { RequestService } from 'src/app/services/request.service';
import { MovieResponse } from 'src/app/interface/MovieResponse.interface';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Output() genreSelectedevent = new EventEmitter<string>();
  @Output() orderChange = new EventEmitter<string>();

  errorMessage: string = '';
  genreResponse: Genres | null = null;

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
  }

  // Select para identificar la selección
  genreSelected(event: Event): void {
    const selectedGenre = (event.target as HTMLSelectElement).value;
    console.log('Selected Genre:', selectedGenre);
    console.log('Genre Change Event:', this.genreSelectedevent)
    this.genreSelectedevent.emit(selectedGenre);
  }

  orderSelected(event: Event): void {
    const selectedOrder = (event.target as HTMLSelectElement).value;
    console.log('Selected Order:', selectedOrder);
    console.log('Order Change Event:', this.orderChange)
    this.orderChange.emit(selectedOrder);
  }

  resetFilters(): void {

  }

  getIDGenre() {
    this.requestService.getIDGenres().subscribe((response) => {
      this.genreResponse  = response;
      console.log("get movie by ID:", response)
    },
      (error) => {
        this.errorMessage = error
      }
    )
  };

}
