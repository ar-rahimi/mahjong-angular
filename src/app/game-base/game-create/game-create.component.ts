import {Component, OnInit} from '@angular/core';
import {Template} from "../models/template";
import {TemplateService} from "../services/template.service";
import {Game} from "../models/game";
import {GamesService} from "../services/games.service";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.scss']
})
export class GameCreateComponent implements OnInit {

  gameTemplates: Template[];
  newGame: Game = new Game();

  constructor(private templateService: TemplateService,
              private gameService: GamesService,
              private authService: AuthenticationService,
              private router: Router) {

  }

  ngOnInit() {
    this.templateService.getTemplates().subscribe(data => {
      this.gameTemplates = data;
    });
  }

  addGame() {
    this.gameService.addGame(this.newGame, this.authService.authenticatedUser())
      .subscribe(data => {
        this.router.navigate(['/']);
      });
  }

}
