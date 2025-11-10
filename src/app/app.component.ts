
import { Component, OnInit } from '@angular/core';
import { WatermarkAppService } from './_service/watermark.service';
import { HeaderComponent } from "./components/_header/header.component";
import { MainComponent } from "./components/main/main.component";
import { FooterComponent } from "./components/footer/footer.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [HeaderComponent, MainComponent, FooterComponent]
})
export class AppComponent implements OnInit {
  showWatermark = false;
  texts: string[] = [];
   Math = Math; // 👈 expõe o objeto Math para o template

  constructor(private watermarkService: WatermarkAppService) {}

  ngOnInit() {
    // Observa mudanças no BehaviorSubject
    this.watermarkService.showWatermark$.subscribe(show => {
      this.showWatermark = show;
      this.texts = this.watermarkService.texts;
    });
  }
}
