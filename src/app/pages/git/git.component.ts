import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-git',
  imports: [RouterLink],
  templateUrl: './git.component.html',
  styleUrl: './../get-starting-angular/get-starting-with-angular.component.css'
})
export class GitComponent {
  @ViewChild('pdfContent') content!: ElementRef;

  downloadPDF() {
    const options :any  = {
      filename: 'git-guia.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(options).from(this.content.nativeElement).save();
  }
}
