import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game-service';

@Component({
  selector: 'app-winner-component',
  imports: [CommonModule],
  templateUrl: './winner-component.html',
  styleUrl: './winner-component.scss',
})
export class WinnerComponent implements OnInit {
  constructor(public gameData: GameService) {}

  ngOnInit() {
    this.launchConfetti();
  }

  launchConfetti() {
    const canvas = document.getElementById('confetti-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces: any[] = [];

    for (let i = 0; i < 150; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * 10,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        tilt: Math.random() * 10 - 10,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let p of pieces) {
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.r, p.r);

        p.y += 2 + p.d / 10;
        p.x += Math.sin(p.tilt);

        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }
      }

      requestAnimationFrame(draw);
    }

    draw();
  }
}
