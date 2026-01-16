import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PdfService } from '../../../_service/pdf.service';


@Component({
  selector: 'app-exercicio-01',
  imports: [RouterLink],
  templateUrl: './exercicio-01.html',
  styleUrl: './../../aulas/aula01/aula01.css',
})
export class Exercicio01 {

  @ViewChild('pdfContent', { static: false }) elementRef!: ElementRef<HTMLElement>;

  constructor(private pdfService: PdfService) {}

  downloadPDF() {
    if (!this.elementRef) {
      console.error('Elemento local #pdfContentLocal não encontrado');
      return;
    }
    this.pdfService.generatePdfWithCanvasWatermark(this.elementRef.nativeElement, 'Exercicio-01.pdf')
      .subscribe({
        next: () => console.log('PDF gerado (local)'),
        error: (err) => console.error(err)
      });
  }



}


