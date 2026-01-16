import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PdfService } from '../../_service/pdf.service';
import { AuthStateService } from '../../_service/auth/auth-state.service';

@Component({
  selector: 'app-uc',
  imports: [RouterLink],
  templateUrl: './uc.html',
  styleUrl: './../aulas/aula01/aula01.css',
})
export class Uc {
   @ViewChild('pdfContent', { static: false }) elementRef!: ElementRef<HTMLElement>;
   version: string  = inject(AuthStateService).angularVersion() as string;

  constructor(private pdfService: PdfService) {}

  downloadPDF() {
    if (!this.elementRef) {
      console.error('Elemento local #pdfContentLocal não encontrado');
      return;
    }
    this.pdfService.generatePdfWithCanvasWatermark(this.elementRef.nativeElement, 'Aula01.pdf')
      .subscribe({
        next: () => console.log('PDF gerado (local)'),
        error: (err) => console.error(err)
      });
  }
}
