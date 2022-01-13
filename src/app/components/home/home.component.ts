import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sort: string = 'Metacritic';
  games: Game[] = [];
  sortList: string[] = [
    "Name",
    "Released",
    "Added",
    "Created",
    "Metacritic"
  ]

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      params['game-search'] ?
        this.searchGames(this.sort, params['game-search']) :
        this.searchGames(this.sort)
    })
  }
  searchGames(sort: string, search?: string): void {
    this.httpService.getGames(sort, search).subscribe(
      (games: APIResponse<Game>) => {
        this.games = games.results;
        console.log(this.games)
      }
    )
  }

}
