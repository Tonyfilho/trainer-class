import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [CommonModule, RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {

   stars = Array.from({length: 50}, (_, i) => ({
    left: Math.random() * 100 + '%',
    top: Math.random() * 100 + '%',
    size: Math.random() * 3 + 1 + 'px',
    opacity: Math.random() * 0.8 + 0.2
  }));
}
