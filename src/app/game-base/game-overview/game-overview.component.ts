import {Component, OnInit} from '@angular/core';

import {Game} from '../models/game';
import {GamesService} from "../services/games.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Filter} from "../models/filter";
import {AuthenticationService} from "../services/authentication.service";
import {TemplateService} from "../services/template.service";
import {Template} from "../models/template";
import * as io from 'socket.io-client';
import {Player} from "app/game-base/models/player";
import {SocketService} from "../services/socket.service";

@Component({
  selector: 'app-game-overview',
  templateUrl: './game-overview.component.html',
  styleUrls: ['./game-overview.component.scss']
})

export class GameOverviewComponent implements OnInit {

  gameTemplates: Template[];
  games: Game[];
  selectedGame: Game;
  filter: Filter;
  searching = false;

  constructor(private gameService: GamesService,
              private socketService: SocketService,
              private authService: AuthenticationService,
              private templateService: TemplateService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.filter = new Filter();
    this.buildFilterWithQueryParams(this.filter);

    this.gameService.getGames(this.filter).subscribe(data => {
      this.games = data;

      // listen to all games
      // this.games.forEach((game) => {
      //   this.socketService.listenForGameState(game);
      //   this.socketService.listenForJoinedPlayers(game);
      // });

    });

    this.templateService.getTemplates().subscribe(data => {
      this.gameTemplates = data;
    });

  }

  selectGame(game) {
    this.selectedGame = game;
    this.socketService.listenForGameState(game);
    this.socketService.listenForJoinedPlayers(game);
  }


  // on double click
  showBoard() {
    if (this.selectedGame.state == 'playing') {
      this.router.navigate([`/games/${this.selectedGame.id}/tiles`])
    }
  }

  search() {
    this.filter.createdBy = '';
    this.searching = true;

    if (this.filter.myGames) {
      this.filter.createdBy = this.authService.authenticatedUser().username;
    }

    this.gameService.getGames(this.filter).subscribe(data => {
      this.games = data;
      this.searching = false;
    });

    this.router.navigate(['/overview'], {
      queryParams: {
        createdBy: this.filter.createdBy,
        state: this.filter.state,
        gameTemplate: this.filter.gameTemplate,
        pageSize: this.filter.pageSize
      }
    });
  }

  allGames() {
    this.filter = new Filter();
    this.search()
  }

  onlyMyGames() {
    this.filter = new Filter();
    this.filter.myGames = true;
    this.search()
  }

  buildFilterWithQueryParams(filter) {
    filter.createdBy = this.getQueryParam("createdBy");
    filter.state = this.getQueryParam("state");
    filter.gameTemplate = this.getQueryParam("gameTemplate");
    filter.pageSize = this.getQueryParam("pageSize");
    filter.myGames = !!this.filter.createdBy;
    return filter;
  }

  getQueryParam(name) {
    return this.route.snapshot.queryParams[name] || '';
  }


}
