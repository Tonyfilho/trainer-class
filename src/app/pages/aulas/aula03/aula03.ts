import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PdfService } from '../../../_service/pdf.service';
import { AuthStateService } from '../../../_service/auth/auth-state.service';

@Component({
  selector: 'app-aula03',
  templateUrl: './aula03.html',
  styleUrl: './../aula01/aula01.css',
  imports: [RouterLink],
})
export class Aula03  {
  version: string = inject(AuthStateService).angularVersion() as string;


  @ViewChild('pdfContent', { static: false }) elementRef!: ElementRef<HTMLElement>;

  constructor(private pdfService: PdfService) {}
  downloadPDF() {
    if (!this.elementRef) {
      console.error('Elemento local #pdfContentLocal não encontrado');
      return;
    }
    this.pdfService
      .generatePdfWithCanvasWatermark(this.elementRef.nativeElement, 'Aula03.pdf')
      .subscribe({
        next: () => console.log('PDF gerado (local)'),
        error: (err) => console.error(err),
      });
  }



}
