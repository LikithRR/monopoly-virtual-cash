import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../../services/game-service';

@Component({
  selector: 'app-start-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './start-component.html',
  styleUrl: './start-component.scss',
  standalone: true,
})
export class StartComponent {

  playerInputs = ['']
  constructor(
    private router: Router,
    public gameData: GameService,
  ) {}

  addPlayerBox() {
    this.playerInputs.push('');
  }

  removePlayerBox(index: number) {
    this.playerInputs.splice(index, 1);
  }

  startGame() {
    this.gameData.players = this.playerInputs
      .map((player) => player.trim())
      .filter((player) => player !== '')
      .map((player) => ({
        name: player,
        amount: this.gameData.startingCash,
        bankrupt: false
      }));
    this.gameData.transactions = []
    this.gameData.positions = []
    this.router.navigate(['/game']);
  }

  get validGame(): boolean {
    return this.playerInputs.filter((player) => player !== '').length >= 2 && this.playerInputs.filter((player) => player !== '').length <= 6;
  }

  trackByIndex(index: number): number {
    return index;
  }
}
