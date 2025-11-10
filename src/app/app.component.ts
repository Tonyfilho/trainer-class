import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { WatermarkAppService } from './_service/watermark.service';
import { HeaderComponent } from "./components/_header/header.component";
import { MainComponent } from "./components/main/main.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [HeaderComponent, MainComponent, FooterComponent, CommonModule]
})
export class AppComponent implements OnInit {
  // Observables que o template vai assinar
  showWatermark$: Observable<boolean>;
  showOverlay$: Observable<boolean>;
  texts: string[] = [];

  constructor(private watermarkService: WatermarkAppService) {
    // Inicializa os Observables
    this.showWatermark$ = this.watermarkService.showWatermark$;
    this.showOverlay$ = this.watermarkService.showOverlay$;
  }

  ngOnInit(): void {
    // Copia os textos do serviço para exibir no template
    this.texts = this.watermarkService.texts;
  }
}
