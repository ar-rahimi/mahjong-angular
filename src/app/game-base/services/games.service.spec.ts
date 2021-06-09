import {TestBed, inject} from '@angular/core/testing';

import {GamesService} from './games.service';
import {Filter} from "../models/filter";
import {HttpModule, ResponseOptions, XHRBackend} from "@angular/http";
import {MockBackend} from '@angular/http/testing';

describe('GamesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [{provide: XHRBackend, useClass: MockBackend}, GamesService]
    });
  });


  // it('should get all the games',
  //   inject([GamesService, XHRBackend], (gameService, mockBackend) => {
  //
  //     const mockResponse = {
  //       "_id": "5933553371f9b60011b69736",
  //       "createdBy": {
  //         "_id": "m.ozdemir3@student.avans.nl",
  //         "name": "Mevlut Ozdemir",
  //         "__v": "0"
  //       },
  //       "createdOn": "2017-06-04T00:32:51.759Z",
  //       "gameTemplate": {
  //         "_id": "Shanghai",
  //         "__v": "0",
  //         "id": "Shanghai"
  //       },
  //       "__v": "0",
  //       "startedOn": "2017-06-04T00:32:54.677Z",
  //       "players": [
  //         {
  //           "_id": "m.ozdemir3@student.avans.nl",
  //           "name": "Mevlut Ozdemir",
  //           "__v": "0"
  //         }
  //       ],
  //       "maxPlayers": 2,
  //       "minPlayers": 1,
  //       "state": "playing",
  //       "id": "5933553371f9b60011b69736",
  //     };
  //
  //     mockBackend.connections.subscribe((connection) => {
  //       connection.mockRespond(new Response(new ResponseOptions({
  //         body: mockResponse
  //       })));
  //     });
  //
  //     gameService.getGames(new Filter()).subscribe((games) => {
  //       expect(games.length).toBe(4);
  //     });
  //
  //   }));
});
