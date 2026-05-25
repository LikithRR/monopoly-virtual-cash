import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GameService } from '../../services/game-service';

@Component({
  selector: 'app-winner-component',
  imports: [CommonModule],
  templateUrl: './winner-component.html',
  styleUrl: './winner-component.scss',
})
export class WinnerComponent {

  constructor(public gameData: GameService) {}
}
