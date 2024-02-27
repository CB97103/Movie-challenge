import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { MovieResponse, MovieResults } from 'src/app/interface/MovieResponse.interface';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  movieID : number = 0;
  movieResponse : MovieResults | null = null;
  errorMessage = '';
  constructor(private requestService: RequestService, private route : ActivatedRoute) { }

  ngOnInit(
  ): void {
   this.movieID = this.route.snapshot.params["id"];
   this.getMovie();
  }

  getMovie() : void {
    this.requestService.getMovieByID(this.movieID).subscribe((response) => {
      this.movieResponse = response;
      console.log("get movie by ID:", response)
    },
      (error) => {
        this.errorMessage = error
      }
    )
  };
}
