import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GameBoardComponent} from './game-board.component';
import {Tile} from "../models/tile";
import {NavbarComponent} from "../navbar/navbar.component";
import {TileComponent} from "../game-tile/tile.component";
import {GamesService} from "../services/games.service";
import {HttpModule} from "@angular/http";
import {SocketService} from "../services/socket.service";
import {AuthenticationService} from "../services/authentication.service";
import {ActivatedRoute} from "@angular/router";

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [GameBoardComponent, NavbarComponent, TileComponent],
      providers: [GamesService, SocketService, AuthenticationService, ActivatedRoute]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});

