import {Tile} from "./tile";

describe('Tile', () => {

  it('Should return true if tile matches', () => {
    let tile1 = new Tile();
    tile1.suit = 'flower';
    tile1.name = '1';

    let tile2 = new Tile();
    tile2.suit = 'flower';
    tile2.name = '1';

    let tile3 = new Tile();
    tile3.suit = 'flower';
    tile3.name = '12';

    let result1 = tile1.matches(tile2);
    let result2 = tile2.matches(tile1);
    let result3 = tile2.matches(tile3);

    expect(result1).toBeTruthy();
    expect(result2).toBeTruthy();
    expect(result3).toBeFalsy();

  });

});
