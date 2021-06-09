import {Pipe, PipeTransform} from '@angular/core';
import {Tile} from "../models/tile";

@Pipe({
  name: 'matched',
  pure: false
})
export class MatchedPipe implements PipeTransform {

  transform(value: Array<Tile>, args?: any): any {

    // filter the tiles, return only the tiles which have a match
    return value.filter(tile => {
      return tile.match
    });
  }

}
