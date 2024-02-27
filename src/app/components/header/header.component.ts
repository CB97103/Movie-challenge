import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() genreSelectedevent = new EventEmitter<string>();
  @Output() orderChange = new EventEmitter<string>();

  sort_By: string = "popularity.desc";
  genre: number | null = null
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  handleGenreChange(selectedGenre: string): void {
    this.genreSelectedevent.emit(selectedGenre);
    console.log('Sorting order changed to:', selectedGenre);
  }

  handleOrderChange(selectedOrder: string): void {
    this.orderChange.emit(selectedOrder);
    console.log('Sorting order changed to:', selectedOrder);
  }

  navigateToHome() {
    this.router.navigate(['']);
    console.log("navigate", this.navigateToHome)
  }
}
