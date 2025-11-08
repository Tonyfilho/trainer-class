import { ElementRef, Injectable } from '@angular/core';
import html2pdf from 'html2pdf.js';

@Injectable({
  providedIn: 'root',
})
export class WatermarkService {
  private ebookUrl = 'https://ebook-angular-dev-hit.web.app/';
  private watermarkActive = false;

  constructor() {}

  createWatermark(): void {
    const watermark = document.getElementById('watermark');
    if (!watermark) return;

    // Limpa marca d'água existente
    watermark.innerHTML = '';

    for (let i = 0; i < 50; i++) {
      const watermarkElement = document.createElement('div');
      watermarkElement.className = 'watermark-text';
      watermarkElement.textContent = this.ebookUrl;

      // Posição aleatória
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;

      watermarkElement.style.left = `${posX}%`;
      watermarkElement.style.top = `${posY}%`;

      // Tamanho aleatório
      const size = 20 + Math.random() * 20;
      watermarkElement.style.fontSize = `${size}px`;

      // Opacidade aleatória
      const opacity = 0.3 + Math.random() * 0.4;
      watermarkElement.style.opacity = opacity.toString();

      // Rotação aleatória
      const rotation = -60 + Math.random() * 120;
      watermarkElement.style.transform = `rotate(${rotation}deg)`;

      watermark.appendChild(watermarkElement);
    }
  }

  activateWatermark(): void {
    const watermark = document.getElementById('watermark');
    if (watermark) {
      watermark.classList.add('active');
      this.watermarkActive = true;
    }
  }

  deactivateWatermark(): void {
    const watermark = document.getElementById('watermark');
    if (watermark) {
      watermark.classList.remove('active');
      this.watermarkActive = false;
    }
  }

  showProtectionMessage(): void {
    const message = document.getElementById('protectionMessage');
    if (message) {
      message.classList.add('active');
    }
  }

  hideProtectionMessage(): void {
    const message = document.getElementById('protectionMessage');
    if (message) {
      message.classList.remove('active');
    }
  }

  initializeProtection(): void {
    this.createWatermark();
    this.setupEventListeners();
    this.detectDevTools();
  }

  private setupEventListeners(): void {
    // Detectar tecla PrintScreen
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen' || (e.ctrlKey && e.key === 'p')) {
        e.preventDefault();
        this.activateWatermark();
        this.showProtectionMessage();
      }
    });

    // Detectar quando a janela perde foco (possível captura de tela)
    window.addEventListener('blur', () => {
      setTimeout(() => {
        this.activateWatermark();
      }, 100);
    });

    // Marca d'água para impressão
    window.addEventListener('beforeprint', () => {
      this.activateWatermark();
    });

    window.addEventListener('afterprint', () => {
      this.deactivateWatermark();
    });
  }

  private detectDevTools(): void {
    // Detecção básica de DevTools
    const devToolsCheck = function () {};
    devToolsCheck.toString = () => {
      this.showProtectionMessage();
      this.activateWatermark();
      return 'DevTools detection';
    };
    console.log('%c', devToolsCheck);
  }







}
