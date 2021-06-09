import {Injectable} from '@angular/core';
import {Game} from "../models/game";
import {Tile} from "app/game-base/models/tile";
import {Player} from "../models/player";
import {Url} from "../models/url";
import * as SocketIO from 'socket.io-client';

@Injectable()
export class SocketService {


  constructor() {
  }

  listenForTileMatching(gameId, gameTiles: Tile[]) {
    let url = new Url().withParams({"gameId": gameId}).get();
    let socket = SocketIO(url);

    socket.on('match', (tiles) => {
      console.log("** Socket: Tile's matched **");
      let tilesToHide = new Set([tiles[0]._id, tiles[1]._id]);

      gameTiles.filter(obj => tilesToHide.has(obj.id))
        .forEach((tile) => {
          tile.visible = false;
          if (tile.id === tiles[0]._id) {
            tile.match = tiles[0].match
          }

          if (tile.id === tiles[1]._id) {
            tile.match = tiles[1].match
          }
        });
    });
  }

  listenForJoinedPlayers(game: Game) {
    let url = new Url().withParams({"gameId": game.id}).get();
    let socket = SocketIO(url);

    socket.on('playerJoined', (player) => {
      console.log("** Socket: player joined **");
      game.addPlayer(new Player(player._id, player.name));
    });
  }

  listenForGameState(game: Game) {
    let url = new Url().withParams({"gameId": game.id}).get();
    let socket = SocketIO(url);

    socket.on('end', () => {
      console.log("** Socket: Game finished **");
      game.state = 'finished';
    });

    socket.on('start', () => {
      console.log("** Socket: Game started **");
      game.state = 'playing';
    });

  }


}
