import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Genres } from 'src/app/interface/MovieResponse.interface';
import { RequestService } from 'src/app/services/request.service';
import { MovieResponse } from 'src/app/interface/MovieResponse.interface';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {


  @Output() genreSelectedevent = new EventEmitter<string>();
  @Output() orderChange = new EventEmitter<string>();
  @Output() genresSelected = new EventEmitter<Genres[]>();
  @Output() resetFiltersevent: EventEmitter<void> = new EventEmitter<void>();


  errorMessage: string = '';
  genreResponse: Genres | null = null;
  selectedFilter: string = 'default';
  selectedGenre: string = 'default';
  genres: Genres[] = [];
  selectedGenreName: string = 'Genre';

  constructor(private requestService: RequestService, private router: Router) { }

  ngOnInit(): void {
    this.getIDGenre();
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
    this.selectedGenre = 'default';
    this.selectedFilter = 'default';
    this.resetFiltersevent.emit();
  }

  getIDGenre() {
    this.requestService.getIDGenres().subscribe((response: { genres: Genres[] }) => {
      this.genres = response.genres;
      console.log("get movie by ID:", response)
    },
      (error) => {
        this.errorMessage = error
      }
    )
  };

}
