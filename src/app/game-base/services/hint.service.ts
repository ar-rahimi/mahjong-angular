import {Injectable} from '@angular/core';
import {TileService} from "./tile.service";

@Injectable()
export class HintService {

  constructor(private tileService: TileService) {
  }


  getTwoUnsurroundedTiles(tiles) {
    let selectableTiles = this.filterSelectableTiles(tiles);

    return this.findMatchingTile(selectableTiles);
  }

  private filterSelectableTiles(tiles) {
    let selectableTiles = [];

    tiles.forEach(tile => {
      if (this.tileService.canBeSelected(tile, tiles)) {
        selectableTiles.push(tile);
      }
    });

    return selectableTiles
  }


  private findMatchingTile(tiles) {
    let matched = [];

    for (let tile of tiles) {

      let withoutCurrentTile = tiles.filter(item => item !== tile);
      let tilesThatMatches = withoutCurrentTile.filter(item => {
        return tile.matches(item);
      });

      if (tilesThatMatches.length) {
        let firstTile = tile;
        let secondTile = tilesThatMatches[0];

        matched.push(firstTile);
        matched.push(secondTile);

        return matched;
      }
    }

    return [];
  }


}
