
import { Component, HostListener } from '@angular/core';
import { HeaderComponent } from "./components/_header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { MainComponent } from "./components/main/main.component";
import { WatermarkService } from './_service/watermark.service';


@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: Event): void {
    event.preventDefault(); // Opcional: prevenir comportamento padrão
    console.log('ESC pressionado via HostListener');
    this.yourEscapeAction();
  }

   constructor(private watermarkService: WatermarkService) {}

  ngOnInit(): void {
    // Inicializar a proteção quando o componente for carregado
    this.watermarkService.initializeProtection();
   // this.watermarkService.deactivateWatermark();
  }

  closeProtectionMessage(): void {
    this.watermarkService.hideProtectionMessage();
    this.watermarkService.deactivateWatermark();
  }



  private yourEscapeAction(): void {
     this.watermarkService.deactivateWatermark();
  }
}
