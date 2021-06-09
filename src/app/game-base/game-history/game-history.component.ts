import {Component, Input, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {Game} from "../models/game";
import {Tile} from "../models/tile";
import {Match} from "../models/match";

@Component({
  selector: 'app-game-history',
  templateUrl: './game-history.component.html',
  styleUrls: ['./game-history.component.scss']
})
export class GameHistoryComponent implements OnInit {

  @Input()
  public gameInput: Game;

  @Input()
  public tilesInput: Tile[];

  constructor() {
  }

  ngOnInit() {

  }

  remaining() {
    return this.filter((tile) => {
      return tile.visible;
    });
  }

  matched() {
    return this.filter((tile) => {
      return tile.visible == false;
    });
  }

  filter(callback) {
    return this.tilesInput.filter(tile => {
        return callback(tile);
      }).length / 2;
  }

}
