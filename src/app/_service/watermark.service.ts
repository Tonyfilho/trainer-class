import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WatermarkAppService {
  private _showWatermark = new BehaviorSubject<boolean>(false);
  showWatermark$ = this._showWatermark.asObservable();

  private _showOverlay = new BehaviorSubject<boolean>(false);
  showOverlay$ = this._showOverlay.asObservable();

  private _texts: string[] = Array(25).fill('https://github.com/Tonyfilho');

  constructor() {
    this.setupListeners();
  }

  get texts(): string[] {
    return this._texts;
  }

  private activate() {
    this._showOverlay.next(true);
    this._showWatermark.next(true);

    // Desativa após alguns segundos
    setTimeout(() => {
      this._showOverlay.next(false);
      this._showWatermark.next(false);
    }, 10000);
  }

  private setupListeners() {
    // Ctrl+P
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        this.activate();
      }
    });

    // beforeprint
    window.addEventListener('beforeprint', () => this.activate());

    // Perda de foco (Print Screen)
    window.addEventListener('blur', () => {
      // ativa instantaneamente o overlay
      this.activate();
    });
  }
}
