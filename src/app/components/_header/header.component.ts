
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Avatar } from "../avatar/avatar";

@Component({
  selector: 'app-header',
  imports: [RouterModule, Avatar],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
