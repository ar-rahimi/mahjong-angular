import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {Game} from "../models/game";
import {User} from "../models/user";
import {Player} from "../models/player";
import {Tile} from "../models/tile";
import {Filter} from "../models/filter";
import {Url} from "../models/url";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {Match} from "../models/match";


@Injectable()
export class GamesService {

  private headers = new Headers({'Content-Type': 'application/json',});
  private options = new RequestOptions({headers: this.headers});

  constructor(private http: Http) {
  }

  getGames(filter: Filter): Observable<Game[]> {
    let url = new Url('/games').withFilterParams(filter).get();

    return this.http.get(url)
      .map(this.extractGames)
      .catch(this.handleError);
  }

  getSingleGame(gameId: String): Observable<Game> {
    let url = new Url(`/games/${gameId}`).get();

    return this.http.get(url)
      .map(this.extractSingleGame)
      .catch(this.handleError);
  }

  addGame(game: Game, user: User): Observable<Game> {
    let url = new Url('/games').withUserParams(user).get();
    let body = game.body();

    return this.http.post(url, body, this.options)
      .map(this.extractSingleGame)
      .catch(this.handleError);
  }

  startGame(game: Game, user: User): Observable<any> {
    let url = new Url(`/games/${game.id}/start`).withUserParams(user).get();

    return this.http.post(url, this.options)
      .catch(this.handleError);
  }

  removeGame(game: Game, user: User): Observable<any> {
    let url = new Url(`/games/${game.id}`).withUserParams(user).get();

    return this.http.delete(url, this.options)
      .catch(this.handleError);
  }

  joinGame(game: Game, user: User): Observable<any> {
    let url = new Url(`/games/${game.id}/players`).withUserParams(user).get();

    return this.http.post(url, this.options)
      .catch(this.handleError);
  }

  leaveGame(game: Game, user: User): Observable<any> {
    let url = new Url(`/games/${game.id}/players`).withUserParams(user).get();

    return this.http.delete(url, this.options)
      .catch(this.handleError);
  }

  getGameTiles(gameId): Observable<any> {
    let url = new Url(`/games/${gameId}/tiles`).get();
    return this.http.get(url, this.options)
      .map(this.createTiles)
      .catch(this.handleError);
  }

  postTileMatches(gameId, user: User, tiles: Tile[]): Observable<any> {
    let body = {
      "tile1Id": tiles[0].id,
      "tile2Id": tiles[1].id,
    };

    let url = new Url(`/games/${gameId}/tiles/matches`).withUserParams(user).get();

    return this.http.post(url, body, this.options)
      .map(this.createTiles)
      .catch(this.handleError);
  }

  createTiles(res: Response) {
    let tiles = [];

    for (let entry of res.json()) {
      let tile = new Tile();
      tile.id = entry._id;
      tile.xPos = entry.xPos;
      tile.yPos = entry.yPos;
      tile.zPos = entry.zPos;
      tile.suit = entry.tile.suit;
      tile.name = entry.tile.name;

      if (entry.match) {
        tile.visible = false;
        let match = new Match();
        match.foundBy = entry.match.foundBy;
        match.foundOn = entry.match.foundOn;
        tile.match = match;
      }

      tiles.push(tile);
    }
    return tiles || [];
  }

  extractGames(res: Response) {
    let gamelist = [];

    for (let entry of res.json()) {
      let game = GamesService.createGame(entry);
      gamelist.push(game);
    }
    return gamelist || [];
  }

  extractSingleGame(res: Response) {
    let entry = res.json();

    let game = GamesService.createGame(entry);
    return game || {};
  }

  static createGame(entry) {
    let game = new Game();
    game.id = entry.id;
    game._id = entry.id;
    game.createdBy = new Player(entry.createdBy._id, entry.createdBy.name);
    game.createdOn = entry.createdOn;
    game.gameTemplate = entry.gameTemplate.id;
    game.totalPlayers = entry.players.length;
    game.players = GamesService.players(entry.players);
    game.maxPlayers = entry.maxPlayers;
    game.minPlayers = entry.minPlayers;
    game.templateId = entry.gameTemplate.id;
    game.state = entry.state;
    return game;
  }

  static players(data): Player[] {
    let players = [];
    for (let entry of data) {
      players.push(new Player(entry._id, entry.name));
    }
    return players
  }

  handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
