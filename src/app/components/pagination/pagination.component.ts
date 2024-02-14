import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Input() currentPage: number;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  constructor() {
    this.currentPage = 1; // Asignar un valor inicial en el constructor
  }

  onPageChange(page: number): void {
    console.log("Changing to page", page); 
    this.currentPage = page;
    this.pageChanged.emit(page);
  }
}
