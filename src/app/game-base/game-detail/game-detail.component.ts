import {Component, Input, OnInit} from '@angular/core';
import {GamesService} from "../services/games.service";
import {Game} from "../models/game";
import {AuthenticationService} from "app/game-base/services/authentication.service";
import {User} from "app/game-base/models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit {

  public currentUser: User;

  @Input()
  public gameInput: Game;

  constructor(private gameService: GamesService,
              private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
    this.currentUser = this.authService.authenticatedUser();
  }

  // on double click
  showBoard() {
    if (this.gameInput.isPlaying()) {
      this.router.navigate([`/games/${this.gameInput.id}/tiles`])
    }
  }


  // todo: duplicate codes && some feedback to the user
  joinGame() {
    if (!this.joinable()) return;

    this.gameService.joinGame(this.gameInput, this.currentUser)
      .subscribe(data => {
        console.log(data);
      });
  }

  leaveGame() {
    if (!this.leavable()) return;

    this.gameService.leaveGame(this.gameInput, this.currentUser)
      .subscribe(data => {
        console.log(data);
      });
  }

  startGame() {
    if (!this.startable()) return;

    this.gameService.startGame(this.gameInput, this.currentUser)
      .subscribe(data => {
        console.log(data);
        console.log(`/games/${this.gameInput.id}/tiles`);
        this.router.navigate([`/games/${this.gameInput.id}/tiles`])
      });
  }

  removeGame() {
    if (!this.removeable()) return;

    this.gameService.removeGame(this.gameInput, this.currentUser)
      .subscribe(data => {
        console.log(data);
      });
  }


  // checks
  joinable(): boolean {
    return this.gameInput.isOpen()
      && this.gameInput.hasPlace()
      && !this.gameInput.isFrom(this.currentUser)
      && !this.gameInput.isJoinedBy(this.currentUser);
  }

  leavable(): boolean {
    return this.gameInput.isOpen()
      && !this.gameInput.isFrom(this.currentUser)
      && this.gameInput.isJoinedBy(this.currentUser);
  }

  startable(): boolean {
    return this.gameInput.isFrom(this.currentUser)
      && this.gameInput.hasEnoughPlayers();
  }

  removeable(): boolean {
    return !this.gameInput.isPlaying()
      && this.gameInput.isFrom(this.currentUser);
  }

}
