import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WatermarkAppService {
  private _showWatermark = new BehaviorSubject<boolean>(false);
  showWatermark$ = this._showWatermark.asObservable();

  private _texts: string[] = Array(25).fill('www.tonyfilho-cv.com');

  constructor() {
    this.setupListeners();
  }

  get texts(): string[] {
    return this._texts;
  }

  /** Ativa a marca d'água */
  activate() {
    this._showWatermark.next(true);

    // Desativa após alguns segundos (tempo do fade)
    setTimeout(() => this._showWatermark.next(false), 4000);
  }

  /** Configura eventos de proteção */
  private setupListeners() {
    // Ctrl + P (impressão)
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        this.activate();
      }

      // Print Screen
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        this.activate();
      }
    });

    // beforeprint (Ctrl+P direto via menu)
    window.addEventListener('beforeprint', () => this.activate());
  }
}
