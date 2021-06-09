import {Pipe, PipeTransform} from '@angular/core';
import {Tile} from "../models/tile";

@Pipe({
  name: 'foundOnDesc'
})
export class FoundOnDescPipe implements PipeTransform {

  // sort the tiles array on descending order based on the foundOn property
  transform(value: Array<Tile>, args?: any): any {
    return value.sort(function (a, b) {
      let key1 = a.match.foundOn;
      let key2 = b.match.foundOn;

      if (key1 > key2) {
        return -1;
      } else if (key1 == key2) {
        return 0;
      } else {
        return 1;
      }
    });
  }

}
