import {User} from "./user";
import {Player} from "./player";
import {Match} from "./match";

export class Game {

  public _id: string;
  public createdBy: Player;
  public createdOn: Date;
  public gameTemplate: string;
  public minPlayers: number;
  public maxPlayers: number;
  public templateId: string;
  public totalPlayers = 0;
  public players: Player[] = [];
  public state: string;
  public id: string;

  addPlayer(player: Player): Game {
    let inList = this.hasPlayer((game) => {
      return game._id == player._id && game.name == player.name;
    });

    if (!inList) {
      this.players.push(player);
      this.totalPlayers++;
    }

    return this;
  }

  hasUser(user: User): boolean {
    return this.hasPlayer(game => {
      return game._id == user.username
    });
  }

  private hasPlayer(callback) {
    return this.players.some(game => {
      return callback(game);
    });
  }

  isOpen(): boolean {
    return this.hasState('open');
  }

  isPlaying(): boolean {
    return this.hasState('playing');
  }

  isFinished(): boolean {
    return this.hasState('finished');
  }

  isFrom(user: User): boolean {
    return this.createdBy._id === user.username;
  }

  isJoinedBy(user: User): boolean {
    return this.players.filter(function (player) {
        return player._id === user.username;
      }, this).length > 0;
  }

  hasPlace(): boolean {
    return this.totalPlayers < this.maxPlayers
  }

  maxPlayersReached(): boolean {
    return this.totalPlayers === this.maxPlayers
  }

  hasEnoughPlayers(): boolean {
    return this.totalPlayers >= this.minPlayers;
  }

  needMorePlayers(): boolean {
    return this.totalPlayers < this.minPlayers;
  }

  playersNeeded(): number {
    return this.minPlayers - this.totalPlayers;
  }

  private hasState(state): boolean {
    return this.state === state;
  }


  body(): string {
    return JSON.stringify({
      "templateName": this.templateId,
      "minPlayers": this.minPlayers,
      "maxPlayers": this.maxPlayers
    });
  }

  addPlayers(players: Player[]): Game {
    players.forEach((player) => {
      this.addPlayer(player);
    });

    return this;
  }

}
