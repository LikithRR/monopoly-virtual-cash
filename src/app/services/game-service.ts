import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  players: { name: string; amount: number, bankrupt: boolean }[] = [];
  startingCash: number = 1500;
  transactions: string[] = [];
  winner: {name: string, amount: number, bankrupt: boolean} | null = null;
  positions: { name: string; amount: number, bankrupt: boolean }[] = [];
}
