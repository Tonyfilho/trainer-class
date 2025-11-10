// src/app/git/git.component.ts
import { Component, ElementRef, ViewChild } from '@angular/core';
import { PdfService } from '../../_service/pdf.service';



@Component({
  selector: 'app-git',
  templateUrl: './git.component.html',
  styleUrl: './../get-starting-angular/get-starting-with-angular.component.css'
})
export class GitComponent {
  @ViewChild('pdfContent', { static: false }) elementRef!: ElementRef<HTMLElement>;

  constructor(private pdfService: PdfService) {}

  downloadPDF() {
    if (!this.elementRef) {
      console.error('Elemento local #pdfContentLocal não encontrado');
      return;
    }
    this.pdfService.generatePdfWithCanvasWatermark(this.elementRef.nativeElement, 'git-ebook.pdf')
      .subscribe({
        next: () => console.log('PDF gerado (local)'),
        error: (err) => console.error(err)
      });
  }
}
