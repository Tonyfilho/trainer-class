import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthGmailService } from '../../_service/auth-gmail.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-avatar',
  imports: [CommonModule],
  templateUrl: './avatar.html',
  styleUrl: './avatar.css',
})
export class Avatar {

  protected authGmailService = inject(AuthGmailService);
  // protected localUser: Observable<User | null> = this.authGmailService.getUser();
  protected localUser: Observable<User | null> = this.authGmailService.getUser();




}
