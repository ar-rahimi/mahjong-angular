import {Routes, RouterModule} from '@angular/router';
import {GameOverviewComponent} from './game-base/game-overview/game-overview.component';
import {GameCreateComponent} from './game-base/game-create/game-create.component';
import {GameDetailComponent} from './game-base/game-detail/game-detail.component';
import {AuthComponent} from './game-base/auth/auth.component';
import {AuthGuard} from './game-base/guards/auth.guard';
import {GameBoardComponent} from "./game-base/game-board/game-board.component";
import {SettingsOverviewComponent} from "./game-base/settings-overview/settings-overview.component";

export const routes: Routes = [
  {path: '', redirectTo: 'overview', pathMatch: 'full'},
  {path: 'overview', component: GameOverviewComponent, canActivate: [AuthGuard]},
  {path: 'games/create', component: GameCreateComponent, canActivate: [AuthGuard]},
  {path: 'games/:id', component: GameDetailComponent, canActivate: [AuthGuard]},
  {path: 'games/:id/tiles', component: GameBoardComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsOverviewComponent, canActivate: [AuthGuard]},
  {path: 'login', component: AuthComponent},
  {path: 'login/callback', component: AuthComponent},

  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];
