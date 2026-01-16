import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthStateService } from '../../../_service/auth/auth-state.service';
import { PdfService } from '../../../_service/pdf.service';

@Component({
  selector: 'app-aula04',
  templateUrl: './aula04.html',
  styleUrl: './../aula01/aula01.css',
  imports: [RouterLink],
})
export class Aula04  {
  version: string = inject(AuthStateService).angularVersion() as string;
  estadoPagina: string = 'Página Inicial';

  @ViewChild('pdfContent', { static: false }) elementRef!: ElementRef<HTMLElement>;

  constructor(private pdfService: PdfService) {}
  downloadPDF() {
    if (!this.elementRef) {
      console.error('Elemento local #pdfContentLocal não encontrado');
      return;
    }
    this.pdfService
      .generatePdfWithCanvasWatermark(this.elementRef.nativeElement, 'Aula04.pdf')
      .subscribe({
        next: () => console.log('PDF gerado (local)'),
        error: (err) => console.error(err),
      });
  }




  
}
