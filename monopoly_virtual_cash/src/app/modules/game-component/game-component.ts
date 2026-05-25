import { Component } from '@angular/core';
import { GameService } from '../../services/game-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './game-component.html',
  styleUrl: './game-component.scss',
})
export class GameComponent {
  sender: string = '';
  receiver: string = '';
  amount: number = 0;

  constructor(
    private router: Router,
    public gameData: GameService,
  ) {}

  transaction() {
    if (this.sender.toLowerCase() == 'everyone') {
      const activePlayers = this.gameData.players.filter((player) => player.bankrupt == false);
      const bankruptPlayers = activePlayers.filter(
        (player) => player.name != this.receiver && player.amount < this.amount,
      );

      if (bankruptPlayers.length > 0) {
        bankruptPlayers.forEach((player) => {
          this.bankruptPlayer(player);
        });
        return;
      }

      activePlayers.forEach((player) => {
        if (player.name != this.receiver) {
          player.amount -= this.amount;
        } else player.amount += this.amount;
      });

      this.gameData.transactions.unshift(`${this.sender} paid ${this.receiver} ${this.amount}`);
      return;
    }

    if (this.receiver.toLowerCase() == 'everyone') {
      const senderPlayer = this.gameData.players.find((player) => player.name == this.sender);
      if (senderPlayer!.amount < this.amount) {
        this.bankruptPlayer(senderPlayer);
        return;
      }

      this.gameData.players.forEach((player) => {
        if (player.name != this.sender && player.bankrupt == false) player.amount += this.amount;
        else if (player.name == this.sender) player.amount -= this.amount;
      });

      this.gameData.transactions.unshift(`${this.sender} paid ${this.receiver} ${this.amount}`);
      return;
    }

    if (this.sender != 'bank') {
      const senderPlayer = this.gameData.players.find((player) => player.name == this.sender);
      if (senderPlayer!.amount < this.amount) {
        this.bankruptPlayer(senderPlayer);
        return;
      } else {
        senderPlayer!.amount -= this.amount;
      }
    }

    if (this.receiver != 'bank') {
      const receiverPlayer = this.gameData.players.find((player) => player.name == this.receiver);
      receiverPlayer!.amount += this.amount;
    }

    this.gameData.transactions.unshift(`${this.sender} paid ${this.receiver} ${this.amount}`);
  }

  bankruptPlayer(player: any) {
    player.bankrupt = true;
    this.gameData.positions.unshift(player);
    this.sender = '';
    this.receiver = '';
    this.gameData.transactions.unshift(`${player.name} went bankrupt`);
    this.checkWinner();
  }

  checkWinner() {
    const activePlayers = this.gameData.players.filter((player) => !player.bankrupt);
    if (activePlayers.length == 1) {
      this.gameData.winner = activePlayers[0];
      this.router.navigate(['/winner']);
    }
  }

  get validTransaction(): boolean {
    if (this.amount < 1) {
      return false;
    }
    if (this.sender == '' || this.receiver == '' || this.sender == this.receiver) return false;
    else if (this.sender == 'bank' || this.receiver == 'bank') {
      if (this.sender == 'everyone' || this.receiver == 'everyone') {
        return false;
      }
    }
    return true;
  }
}
