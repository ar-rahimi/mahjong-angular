import {Game} from "./game";
import {Player} from "./player";
import {User} from "./user";

describe('Game', () => {

  it('Should add a player if the player is not already a player in the list', () => {
    let game = new Game();

    let playerToBeAdded1 = new Player('id1', 'player1');
    let playerToBeAdded2 = new Player('id2', 'player2');
    let playerToBeAdded3 = new Player('id3', 'player3');
    let playerToBeAdded4 = new Player('id4', 'player4');

    let playerToNotBeAdded = new Player('id4', 'player4');

    game.addPlayers([playerToBeAdded1, playerToBeAdded2, playerToBeAdded3, playerToBeAdded4, playerToNotBeAdded]);

    expect(game.players.length).toBe(4);
  });

  it('Should return true if a user has joined the game', () => {
    let game = new Game();

    let player1 = new Player('id1', 'player1');
    let player2 = new Player('id2', 'player2');
    let player3 = new Player('id3', 'player3');

    game.addPlayers([player1, player2, player3]);

    let joinedUser1 = new User('id1', 'token');
    let joinedUser2 = new User('id2', 'token');

    expect(game.isJoinedBy(joinedUser1)).toBeTruthy();
    expect(game.isJoinedBy(joinedUser2)).toBeTruthy();
  });

  it('Should return false if a user has not joined the game', () => {
    let game = new Game();

    let player1 = new Player('id1', 'player1');
    let player2 = new Player('id2', 'player2');
    let player3 = new Player('id3', 'player3');

    game.addPlayers([player1, player2, player3]);

    let notJoinedUser = new User('id4', 'token');

    expect(game.isJoinedBy(notJoinedUser)).toBeFalsy();
  });

  it('Should return true if a game has place so it can be joined by a player', () => {
    let game = new Game();
    game.minPlayers = 1;
    game.maxPlayers = 4;

    let player1 = new Player('id1', 'player1');
    let player2 = new Player('id2', 'player2');
    let player3 = new Player('id3', 'player3');

    game.addPlayer(player1);
    game.addPlayer(player2);
    game.addPlayer(player3);

    expect(game.hasPlace()).toBeTruthy();
  });

  it('Should return false if a game has reached it\'s max players', () => {
    let game = new Game();
    game.minPlayers = 1;
    game.maxPlayers = 4;

    let player1 = new Player('id1', 'player1');
    let player2 = new Player('id2', 'player2');
    let player3 = new Player('id3', 'player3');
    let player4 = new Player('id4', 'player4');

    game.addPlayers([player1, player2, player3, player4]);

    expect(game.maxPlayersReached()).toBeTruthy();
  });

  it('Should return true if the match can be started / the minimum amount of players have been reached', () => {
    let game = new Game();
    game.minPlayers = 2;
    game.maxPlayers = 10;

    let player1 = new Player('id1', 'player1');
    let player2 = new Player('id2', 'player2');
    let player3 = new Player('id3', 'player3');

    game.addPlayers([player1, player2, player3]);

    expect(game.hasEnoughPlayers()).toBeTruthy()
  });

  it('Should return false if the match can not be started / the minimum amount of players are not been reached', () => {
    let game = new Game();
    game.minPlayers = 2;
    game.maxPlayers = 10;

    let player1 = new Player('id1', 'player1');

    game.addPlayer(player1);

    expect(game.hasEnoughPlayers()).toBeFalsy()
  });


  it('Should return the amount of players that is needed to reach the minimum amount of players', () => {
    let game = new Game();
    game.minPlayers = 5;
    game.maxPlayers = 10;

    let player1 = new Player('id1', 'player1');
    let player2 = new Player('id2', 'player2');
    let player3 = new Player('id3', 'player3');
    let player4 = new Player('id4', 'player4');

    game.addPlayers([player1, player2, player3, player4]);

    expect(game.playersNeeded()).toBe(1)
  });

  it('Should return true if a user can start his own game', () => {
    let user = new User('mozdemir3@avans.nl', 'token');
    let game = new Game();
    game.minPlayers = 2;
    game.maxPlayers = 10;
    game.createdBy = new Player('mozdemir3@avans.nl', 'Mevlut Ozdemir');
    let player1 = new Player('mozdemir3@avans.nl', 'Mevlut Ozdemir');
    let player2 = new Player('id2', 'player2');

    game.addPlayers([player1, player2]);

    expect(game.isFrom(user)).toBeTruthy();
    expect(game.hasEnoughPlayers()).toBeTruthy();
  });

  it('Should return true if game is open', () => {
    let game = new Game();
    game.state = "open";

    expect(game.isOpen()).toBeTruthy()
  });

  it('Should return false if game is not open', () => {
    let game = new Game();
    game.state = "finished";

    expect(game.isOpen()).toBeFalsy()
  });

  it('Should return true if game is been playing', () => {
    let game = new Game();
    game.state = "playing";

    expect(game.isPlaying()).toBeTruthy()
  });

  it('Should return false if game is not been playing', () => {
    let game = new Game();
    game.state = "open";

    expect(game.isPlaying()).toBeFalsy()
  });


});
