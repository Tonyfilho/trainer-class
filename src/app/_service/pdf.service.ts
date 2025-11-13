// src/app/services/pdf-canvas.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Injectable({ providedIn: 'root' })
export class PdfService {
  constructor() {}

  /**
   * Gera e baixa o PDF com watermark desenhada no canvas.
   * Retorna um Observable que completa quando o download terminou.
   *
   * element: HTMLElement ou selector string (ex: '#pdfContent')
   */
  generatePdfWithCanvasWatermark(target: HTMLElement | string, fileName = 'document.pdf'): Observable<void> {
    return new Observable<void>(observer => {
      let element: HTMLElement | null;
      if (typeof target === 'string') element = document.querySelector(target);
      else element = target as HTMLElement;

      if (!element) {
        observer.error(new Error('Elemento alvo não encontrado: ' + target));
        return;
      }

      // Configurações: escala para qualidade (aumenta resolução do canvas)
      const scale = 2;

      html2canvas(element, { scale, useCORS: true, logging: false })
        .then((canvas: HTMLCanvasElement) => {
          // 1) desenha watermark repetida/padrão no canvas
          this.drawRepeatedWatermarkOnCanvas(canvas, {
            text: 'https://www.linkedin.com/in/tony-filho-238238233/',
            repeatSpacingX: 300,   // espaçamento em px do padrão (ajusta conforme necessário)
            repeatSpacingY: 220,
            smallAlpha: 0.14,
            smallFontPx: 32,
            centralText: 'EBOOK - TONY FILHO',
            centralAlpha: 0.06,
            centralFontPx: 160,
            rotateDegrees: -30
          });

          // 2) converte canvas em páginas A4 e gera PDF
          this.canvasToMultiPagePdf(canvas, fileName)
            .then(() => {
              observer.next();
              observer.complete();
            })
            .catch(err => observer.error(err));
        })
        .catch(err => observer.error(err));
    });
  }

  /** Desenha uma marca d'água repetida + central no canvas */
  private drawRepeatedWatermarkOnCanvas(canvas: HTMLCanvasElement, opts: {
    text: string;
    repeatSpacingX: number;
    repeatSpacingY: number;
    smallAlpha: number;
    smallFontPx: number;
    centralText?: string;
    centralAlpha?: number;
    centralFontPx?: number;
    rotateDegrees?: number;
  }) {
    const ctx = canvas.getContext('2d')!;
    const cw = canvas.width;
    const ch = canvas.height;

    // 1) cria um pequeno canvas com o texto rotacionado para repetir como pattern
    const stampW = opts.repeatSpacingX;
    const stampH = opts.repeatSpacingY;
    const stamp = document.createElement('canvas');
    stamp.width = Math.max(200, stampW);
    stamp.height = Math.max(100, stampH);
    const sctx = stamp.getContext('2d')!;
    sctx.clearRect(0, 0, stamp.width, stamp.height);

    // configura texto do stamp
    sctx.save();
    sctx.translate(stamp.width / 2, stamp.height / 2);
    sctx.rotate((opts.rotateDegrees ?? -30) * Math.PI / 180);
    sctx.font = `bold ${opts.smallFontPx}px sans-serif`;
    sctx.fillStyle = `rgba(0,0,0,${opts.smallAlpha})`;
    sctx.textAlign = 'center';
    sctx.textBaseline = 'middle';
    sctx.fillText(opts.text, 0, 0);
    sctx.restore();

    // cria pattern e pinta sobre o canvas
    const pattern = ctx.createPattern(stamp, 'repeat')!;
    ctx.save();
    ctx.globalAlpha = 1; // já aplica alpha no stamp
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, cw, ch);
    ctx.restore();

    // 2) opcional: desenha marca d'água central grande (discreta)
    if (opts.centralText) {
      ctx.save();
      ctx.translate(cw / 2, ch / 2);
      ctx.rotate((opts.rotateDegrees ?? -30) * Math.PI / 180);
      ctx.font = `bold ${opts.centralFontPx}px sans-serif`;
      ctx.fillStyle = `rgba(0,0,0,${opts.centralAlpha ?? 0.06})`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(opts.centralText, 0, 0);
      ctx.restore();
    }
  }

  /**
   * Divide o canvas em páginas A4 e gera o PDF com jsPDF.
   * Retorna uma Promise que resolve quando o PDF for salvo.
   */
  private async canvasToMultiPagePdf(canvas: HTMLCanvasElement, fileName: string): Promise<void> {
    const pdf = new jsPDF({
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    });

    const pdfW = pdf.internal.pageSize.getWidth();
    const pdfH = pdf.internal.pageSize.getHeight();

    // calcular altura da página em px de acordo com a proporção do canvas
    // pageHeightPx = canvas.width * (pdfH / pdfW)
    const pageHeightPx = Math.floor(canvas.width * (pdfH / pdfW));

    let remainingHeight = canvas.height;
    let offsetY = 0;
    let pageIndex = 0;

    while (remainingHeight > 0) {
      // cria um canvas temporário para esta página
      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = canvas.width;
      pageCanvas.height = Math.min(pageHeightPx, remainingHeight);
      const pCtx = pageCanvas.getContext('2d')!;

      // desenha a fatia do canvas original
      pCtx.fillStyle = '#ffffff';
      pCtx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
      pCtx.drawImage(canvas, 0, offsetY, canvas.width, pageCanvas.height, 0, 0, canvas.width, pageCanvas.height);

      // converte para imagem (jpeg)
      const imgData = pageCanvas.toDataURL('image/jpeg', 0.95);

      const imgProps = (pdf as any).getImageProperties(imgData);
      const imgWidthMm = pdfW;
      const imgHeightMm = (pageCanvas.height * pdfW) / pageCanvas.width;

      if (pageIndex > 0) pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidthMm, imgHeightMm);

      remainingHeight -= pageHeightPx;
      offsetY += pageHeightPx;
      pageIndex++;
    }

    // salva o PDF
    return new Promise<void>((resolve, reject) => {
      try {
        pdf.save(fileName);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
}
