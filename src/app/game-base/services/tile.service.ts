import {Injectable} from '@angular/core';
import {Tile} from "../models/tile";

@Injectable()
export class TileService {

  constructor() {
  }

  /**
   * Check if a tile is not surrounded by another tile
   *
   * @param tile
   *    The tile to check
   * @param tiles
   *    All the remaining tiles
   * @returns {boolean}
   *    True if the tile can be selected / [tile is not surrounded]
   */
  canBeSelected(tile: Tile, tiles: Tile[]): boolean {
    tiles = this.onlyVisibleTiles(tiles);

    let hasTileOnLeft = this.hasLeft(tile, tiles);
    let hasTileOnRight = this.hasRight(tile, tiles);

    if (hasTileOnLeft && hasTileOnRight) return false;
    // continue only if the left or ride sides (or both) are empty

    let isSurrounded = this.isSurrounded(tile, tiles).length > 0;

    return !isSurrounded;
  }

  onlyVisibleTiles(tiles){
    return tiles.filter((tile) => {
      return tile.visible === true;
    });
  }


  /**
   * 5 Steps algorithm to check if the tile is surrounded.
   *
   * @param selected,
   *    The tile to check for
   * @param tiles,
   *    All the remaining visible tiles
   * @returns {boolean},
   *    True if the tile is surrounded by another tile
   */
  isSurrounded(selected, tiles) {
    return tiles.filter((comparedTo) => {
      return this.hasTileOnTop(selected, comparedTo)         // Step [1]
        || this.isLeftSideOverlapped(selected, comparedTo)   // Step [2]
        || this.isRightSideOverlapped(selected, comparedTo)  // Step [3]
        || this.isBottomSideOverlapped(selected, comparedTo) // Step [4]
        || this.isTopSideOverlapped(selected, comparedTo)    // Step [5]
    });
  }


  /**
   * Step [1]
   *
   * Check if there is a tile on exact the same place with a higher z-index
   */
  hasTileOnTop(selected, comparedTo) {
    return this.compareForSameXPos(selected, comparedTo)
      && this.compareForSameYPos(selected, comparedTo)
      && this.checkTileOnTop(selected, comparedTo);
  }


  /**
   * Step [2]
   *
   * Check if there is a tile on the left side that is overlapping the tile
   * (with higher z-index) [top, center, right]
   */
  isLeftSideOverlapped(selected, comparedTo) {
    return this.isLeftTopSideOverlapped(selected, comparedTo)
      || this.isLeftCenterOverlapped(selected, comparedTo)
      || this.isLeftBottomSideOverlapped(selected, comparedTo)
  }

  // [2.1]
  isLeftTopSideOverlapped(selected, comparedTo) {
    return this.compareOverlapLeftCenter(selected, comparedTo)
      && this.compareOverlapTop(selected, comparedTo)
      && this.checkTileOnTop(selected, comparedTo);
  }

  // [2.2]
  isLeftCenterOverlapped(selected, comparedTo) {
    return this.compareOverlapLeftCenter(selected, comparedTo)
      && this.compareForSameYPos(selected, comparedTo)
      && this.checkTileOnTop(selected, comparedTo);
  }

  // [2.3]
  isLeftBottomSideOverlapped(selected, comparedTo) {
    return this.compareOverlapLeftCenter(selected, comparedTo)
      && this.compareOverlapBottom(selected, comparedTo)
      && this.checkTileOnTop(selected, comparedTo);
  }


  /**
   * Step [3]
   *
   * Check if there is a tile on the right side that is overlapping the tile
   * (with higher z-index) [top, center, right]
   */
  isRightSideOverlapped(selected, comparedTo) {
    return this.isRightTopSideOverlapped(selected, comparedTo)
      || this.isRightCenterOverlapped(selected, comparedTo)
      || this.isRightBottomSideOverlapped(selected, comparedTo)
  }

  // [3.1]
  isRightTopSideOverlapped(selected, comparedTo) {
    return this.compareOverlapRightCenter(selected, comparedTo)
      && this.compareOverlapTop(selected, comparedTo)
      && this.checkTileOnTop(selected, comparedTo);
  }

  // [3.2]
  isRightCenterOverlapped(selected, comparedTo) {
    return this.compareOverlapRightCenter(selected, comparedTo)
      && this.compareForSameYPos(selected, comparedTo)
      && this.checkTileOnTop(selected, comparedTo);
  }

  // [3.3]
  isRightBottomSideOverlapped(selected, comparedTo) {
    return this.compareOverlapRightCenter(selected, comparedTo) && // return comparedTo.xPos - 1 == selected.xPos
      this.compareOverlapBottom(selected, comparedTo) &&
      this.checkTileOnTop(selected, comparedTo);
  }

  compareOverlapTop(selected, comparedTo) {
    return selected.yPos + 1 === comparedTo.yPos;
  }

  compareOverlapLeftCenter(selected, comparedTo) {
    return selected.xPos - 1 === comparedTo.xPos;
  }

  compareOverlapRightCenter(selected, comparedTo) {
    return selected.xPos + 1 === comparedTo.xPos;
  }

  compareOverlapBottom(selected, comparedTo) {
    return selected.yPos - 1 === comparedTo.yPos;
  }

  /**
   * Step [4]
   *
   * Check if bottom side of the tile is overlapped
   */
  isBottomSideOverlapped(selected, comparedTo) {
    return this.compareForSameXPos(selected, comparedTo)
      && this.compareOverlapBottom(selected, comparedTo)
      && this.checkTileOnTop(selected, comparedTo)
  }

  /**
   * Step [5]
   *
   * Check if top side of the tile is overlapped
   */
  isTopSideOverlapped(selected, comparedTo) {
    return this.compareForSameXPos(selected, comparedTo)
      && this.compareOverlapTop(selected, comparedTo)
      && this.checkTileOnTop(selected, comparedTo)
  }


  /**
   * Check if there is any tile on the left side [top, center, bottom]
   */
  hasLeft(selected, tiles) {
    return tiles.filter((comparedTo) => {
        return this.hasLeftTop(selected, comparedTo)    // step [1]
          || this.hasLeftCenter(selected, comparedTo)   // step [2]
          || this.hasLeftBottom(selected, comparedTo);  // step [3]
      }).length > 0;
  }

  // [1]
  hasLeftTop(selected, comparedTo) {
    return this.compareWithLeftTile(selected, comparedTo)
      && this.compareForSameYPos(selected, comparedTo)
      && this.comapreForSameZPos(selected, comparedTo);
  }

  // [2]
  hasLeftCenter(selected, comparedTo) {
    return this.compareWithLeftTile(selected, comparedTo)
      && this.compareWithTopTile(selected, comparedTo)
      && this.comapreForSameZPos(selected, comparedTo);
  }

  // [3]
  hasLeftBottom(selected, comparedTo) {
    return this.compareWithLeftTile(selected, comparedTo)
      && this.comapreWithBottomTile(selected, comparedTo)
      && this.comapreForSameZPos(selected, comparedTo)
  }


  /**
   * Check if there is a tile on the right side [top, center, bottom]
   */
  hasRight(selected, tiles) {
    return tiles.filter((comparedTo) => {
        return this.hasRightTop(selected, comparedTo)     // step [1]
          || this.hasRightCenter(selected, comparedTo)    // step [2]
          || this.hasRightBottom(selected, comparedTo)    // step [3]
      }).length > 0;
  }

  // [1]
  hasRightTop(selected, comparedTo) {
    return this.compareWithRightTile(selected, comparedTo)
      && this.compareForSameYPos(selected, comparedTo)
      && this.comapreForSameZPos(selected, comparedTo)
  }

  // [2]
  hasRightCenter(selected, comparedTo) {
    return this.compareWithRightTile(selected, comparedTo)
      && this.compareWithTopTile(selected, comparedTo)
      && this.comapreForSameZPos(selected, comparedTo)
  }

  // [3]
  hasRightBottom(selected, comparedTo) {
    return this.compareWithRightTile(selected, comparedTo)
      && this.comapreWithBottomTile(selected, comparedTo)
      && this.comapreForSameZPos(selected, comparedTo)
  }


  compareWithTopTile(selected, comparedTo) {
    return selected.yPos - 1 === comparedTo.yPos;
  }

  compareWithRightTile(selected, comparedTo) {
    return selected.xPos + 2 === comparedTo.xPos;
  }

  comapreWithBottomTile(selected, comparedTo) {
    return selected.yPos + 1 === comparedTo.yPos;
  }

  compareWithLeftTile(selected, comparedTo) {
    return selected.xPos - 2 === comparedTo.xPos;
  }

  comapreForSameZPos(selected, comparedTo) {
    return selected.zPos === comparedTo.zPos;
  }

  compareForSameYPos(selected, comparedTo) {
    return selected.yPos === comparedTo.yPos;
  }

  compareForSameXPos(selected, comparedTo) {
    return selected.xPos === comparedTo.xPos;
  }

  checkTileOnTop(selected, comparedTo) {
    return selected.zPos < comparedTo.zPos;
  }

}
