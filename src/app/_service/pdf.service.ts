import {  Injectable } from '@angular/core';
import html2pdf from 'html2pdf.js';

@Injectable({
  providedIn: 'root',
})
export class PDFService {
  private ebookUrl = 'https://ebook-angular-dev-hit.web.app/';






downloadPDF(content: any) {
  const options: any = {
    filename: 'starting-environment-angular-guia.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      onclone: (clonedDoc: Document) => {
        // Adiciona a marca d’água no documento clonado
        const watermark = clonedDoc.createElement('div');
        watermark.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.15;
        `;

        // Cria várias instâncias da marca d’água
        for (let i = 0; i < 40; i++) {
          const mark = clonedDoc.createElement('div');
          mark.textContent = 'www.ebook-angular-dev-hit.web.app';
          mark.style.cssText = `
            position: absolute;
            color: rgba(200, 0, 0, 0.3);
            font-size: 22px;
            font-weight: bold;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            transform: rotate(${-45 + Math.random() * 90}deg);
            white-space: nowrap;
          `;
          watermark.appendChild(mark);
        }

        // Insere a marca d’água no topo do conteúdo
        const pdfContent: any = clonedDoc.querySelector('#pdfContent');
        if (pdfContent) {
          pdfContent.style.position = 'relative';
          pdfContent.appendChild(watermark);
        } else {
          clonedDoc.body.appendChild(watermark);
        }
      },
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  };

  html2pdf().set(options).from(content.nativeElement).save();
}

}
