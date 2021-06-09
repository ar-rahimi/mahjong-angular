import {Component, OnInit} from '@angular/core';
import {GamesService} from "../services/games.service";
import {AuthenticationService} from "../services/authentication.service";
import {User} from "app/game-base/models/user";
import {Tile} from "../models/tile";
import {ActivatedRoute, Router} from "@angular/router";
import {SocketService} from "../services/socket.service";
import {TileService} from "../services/tile.service";
import {Game} from "../models/game";
import {HintService} from "../services/hint.service";
import {Observable} from "rxjs/Observable";
import {Match} from "../models/match";


@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})

export class GameBoardComponent implements OnInit {

  tiles: Tile[];
  selectedTiles = [];
  matches: Match[];

  currentUser: User;
  game: Game;
  gameId: string;

  hintTiles = [];
  botIsWorking = false;
  processing = false; // true when a (post) request is processing.

  constructor(private gameService: GamesService,
              private socketService: SocketService,
              private authService: AuthenticationService,
              private route: ActivatedRoute,
              private tileService: TileService,
              private hintService: HintService) {
  }

  ngOnInit() {
    this.currentUser = this.authService.authenticatedUser();

    this.route.params.subscribe(params => {
      this.gameId = params['id'];

      this.gameService.getGameTiles(this.gameId).subscribe(data => {
        this.tiles = data;
        this.matches = this.getMatches(this.tiles);

        this.socketService.listenForTileMatching(this.gameId, this.tiles);
      });
    });

    this.gameService.getSingleGame(this.gameId).subscribe(data => {
      this.game = data;

      this.socketService.listenForGameState(this.game);
    });
  }


  getMatches(tiles: Tile[]): Match[] {
    let matches = [];
    tiles.forEach(tile => {
      if (tile.match) {
        matches.push(tile.match)
      }
    });

    return matches;
  }


  startBot() {
    this.botIsWorking = true;

    this.starTimer(500, () => {
      this.showHint();
    });

    this.starTimer(1000, () => {
      this.matchHintedTiles();
    });
  }

  stopBot() {
    this.botIsWorking = false;
  }

  starTimer(seconds, callback) {
    Observable.interval(seconds).subscribe(() => {
      if (this.game.isFinished()) return;
      if (this.processing) return; //

      if (this.botIsWorking) {
        callback();
      }
    });
  }


  showHint() {
    let tiles = this.hintService.getTwoUnsurroundedTiles(this.tiles);

    if (this.hasTwoTiles(tiles)) {
      this.tiles.forEach(tile => {
        if (tile === tiles[0] || tile === tiles[1]) {
          this.hintTiles.push(tile);
          tile.select();
        }
      });
    }
  }

  hideHint() {
    this.unselectAll(this.hintTiles);
    this.hintTiles = [];
  }

  matchHintedTiles() {
    this.hintTiles.forEach(tile => {
      this.selectedTiles.push(tile);
      this.handleTileSelection();
    });

    this.hintTiles = [];
  }


  tileSelected(tile: Tile) {
    if (!this.canPlay()) {
      return;
    }

    let canBeSelected = this.tileService.canBeSelected(tile, this.tiles);

    if (!canBeSelected) return;

    if (this.selectedTiles.length > 0) {
      // if selected tile doesn't match the first selected tile, don't need to continue
      if (!tile.matches(this.selectedTiles[0])) return;
    }

    if (!tile.selected) {
      this.selectedTiles.unshift(tile); // add tile to front of array
      tile.select();
    } else {
      this.selectedTiles.pop(); // removes last item of array (unselect a tile)
      tile.deselect();
    }

    this.handleTileSelection();
  }


  handleTileSelection() {
    this.processing = true;

    if (this.hasTwoTiles(this.selectedTiles)) {
      if (this.tilesMatching(this.selectedTiles)) {

        // make post request
        this.gameService
          .postTileMatches(this.gameId, this.currentUser, this.selectedTiles)
          .subscribe(data => {
            // data.forEach(tile => {
            //   tile.visible = false;
            // });

            this.processing = false;
          });
        this.hintTiles.forEach(tile => {
          tile.visible = false;
        })

      }

      this.unselectAll(this.selectedTiles);
      this.selectedTiles = []
    }
  }


  hasTwoTiles(tiles: Tile[]) {
    return tiles.length === 2
  }


  tilesMatching(tiles) {
    // if less then two tiles selected
    if (tiles.length < 2) return false;

    let firstTile = tiles[0];
    let secondTile = tiles[1];

    return firstTile.matches(secondTile);
  }


  unselectAll(tiles: Tile[]) {
    tiles.forEach((tile) => {
      tile.deselect();
    });
  }

  canPlay() {
    return this.game && this.game.hasUser(this.currentUser);
  }

  gameNotFinished() {
    return this.game && !this.game.isFinished();
  }

}
