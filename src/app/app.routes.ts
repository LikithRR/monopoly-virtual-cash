import { Routes } from '@angular/router';
import { StartComponent } from './modules/start-component/start-component';
import { HomeComponent } from './modules/home-component/home-component';
import { GameComponent } from './modules/game-component/game-component';
import { WinnerComponent } from './modules/winner-component/winner-component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'start', component: StartComponent },
  { path: 'game', component: GameComponent },
  { path: 'winner', component: WinnerComponent}
];
