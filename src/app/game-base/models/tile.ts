import {Match} from "./match";
export class Tile {

  private imgPath = 'src/assets/tiles';

  id: string;
  xPos: number;
  yPos: number;
  zPos: number;
  suit: string;
  name: string;
  selected: boolean;
  tileType = 'wooden'; // or shiny
  visible = true;
  match: Match;

  select() {
    this.selected = true;
  }

  deselect(){
    this.selected = false;
  }

  matches(tile: Tile): boolean {
    // tiles with season & flowers can match without same Name
    if (tile.suit === 'Season' || tile.suit === 'Flower') {
      return this.isSameSuit(tile) && this.compareVisibility(tile);
    }

    return this.isSameName(tile) && this.isSameSuit(tile) && this.compareVisibility(tile)
  }

  isSameName(tile: Tile): boolean {
    return this.name == tile.name;
  }

  isSameSuit(tile: Tile): boolean {
    return this.suit == tile.suit;
  }

  compareVisibility(tile: Tile): boolean {
    return this.visible === true
      && tile.visible === true;
  }

  getTileImage(): string {
    let tiletype = localStorage.getItem("theme");

    return `${this.imgPath}/${(tiletype != null ? tiletype : this.tileType)}/${this.suit}/${this.name}.gif`
  }

  getEmptyTileImage(): string {
    return `${this.imgPath}/tile.gif`
  }

  getOverlayTileImage(): string {
    return `${this.imgPath}/overlay.gif`
  }

  getZIndex(): number {
    return Math.round((this.zPos*10000+(100/this.yPos))+(100/this.xPos))
  }


}
