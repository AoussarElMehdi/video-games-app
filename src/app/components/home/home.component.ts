import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sortList: string[] = ["Name", "Released", "Added", "Created", "Metacritic"]
  sort: string = this.sortList[0];
  games: Game[] = [];
  routeSubscription!: Subscription;
  gameServiceSubscription!: Subscription;

  constructor(
    private router: Router,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      params['game-search'] ?
        this.searchGames(this.sort, params['game-search']) :
        this.searchGames(this.sort)
    })
  }
  searchGames(sort: string, search?: string): void {
    this.gameServiceSubscription = this.httpService.getGames(sort, search).subscribe(
      (games: APIResponse<Game>) => {
        this.games = games.results;
        console.log(this.games)
      }
    )
  }

  filterGames(sort: string): void{
    console.log(sort)
    if(this.sort !== sort) this.sort = sort
    this.httpService.getGames(sort).subscribe(
      (games: APIResponse<Game>) => {
        this.games = games.results;
        console.log(this.games)
      }
    )
  }

  openGameDetails(gameId: number): void{
    this.router.navigate(['details', gameId])
  }

  ngOnDestroy(): void {
    this.gameServiceSubscription && this.gameServiceSubscription.unsubscribe()
    this.routeSubscription && this.routeSubscription.unsubscribe()

  }
}
