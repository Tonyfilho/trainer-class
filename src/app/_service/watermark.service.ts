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
    setTimeout(() => this._showWatermark.next(false), 150000);
  }

  /** Configura eventos de proteção */
  private setupListeners() {
    // Ctrl + P (impressão)
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        this.activate();
      }
    });

    // beforeprint (menu do navegador)
    window.addEventListener('beforeprint', () => this.activate());

    // Detectar perda de foco da janela (possível PrintScreen)
    window.addEventListener('blur', () => {
      // Pequeno delay para evitar falsos positivos
      setTimeout(() => {
        this.activate();
      }, 0);
    });
  }
}
