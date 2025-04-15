import { Component } from '@angular/core';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  protected  dateTime = DateTime.now();


}
