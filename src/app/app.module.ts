import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {routes} from './app.routes';

import {AppComponent} from './app.component';
import {GameBoardComponent} from './game-base/game-board/game-board.component';
import {GameOverviewComponent} from './game-base/game-overview/game-overview.component';
import {GameDetailComponent} from './game-base/game-detail/game-detail.component';
import {GameCreateComponent} from './game-base/game-create/game-create.component';
import {TemplateService} from "./game-base/services/template.service";
import {GamesService} from "./game-base/services/games.service";
import {AuthenticationService} from "./game-base/services/authentication.service";
import {RouterModule} from "@angular/router";
import {AuthComponent} from './game-base/auth/auth.component';
import {AuthGuard} from './game-base/guards/auth.guard';
import {TileComponent} from './game-base/game-tile/tile.component';
import {SocketService} from "./game-base/services/socket.service";
import {NavbarComponent} from "./game-base/navbar/navbar.component";
import {NgModule} from "@angular/core";
import {TileService} from "./game-base/services/tile.service";
import {HintService} from "./game-base/services/hint.service";
import {GameHistoryComponent} from './game-base/game-history/game-history.component';
import {MatchedPipe} from './game-base/pipes/matched.pipe';
import {FoundOnDescPipe} from './game-base/pipes/found-on-desc.pipe';
import {SettingsOverviewComponent} from './game-base/settings-overview/settings-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    GameOverviewComponent,
    GameDetailComponent,
    GameCreateComponent,
    NavbarComponent,
    AuthComponent,
    TileComponent,
    GameHistoryComponent,
    MatchedPipe,
    FoundOnDescPipe,
    SettingsOverviewComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [TemplateService, GamesService, AuthenticationService, AuthGuard, SocketService, TileService, HintService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
