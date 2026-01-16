import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PdfService } from '../../../_service/pdf.service';
import { AuthStateService } from '../../../_service/auth/auth-state.service';


@Component({
  selector: 'app-aula01',
  templateUrl: './aula01.html',
  styleUrl: './aula01.css',
  imports: [RouterLink],
})
export class Aula01  {

  version: string  = inject(AuthStateService).angularVersion() as string;


   @ViewChild('pdfContent', { static: false }) elementRef!: ElementRef<HTMLElement>;

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
