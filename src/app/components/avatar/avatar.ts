import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';
import { AuthStateService } from '../../_service/auth/auth-state.service';

@Component({
  selector: 'app-avatar',
  imports: [CommonModule],
  templateUrl: './avatar.html',
  styleUrl: './avatar.css',
})
export class Avatar {


protected authStateService = inject(AuthStateService);
// protected localUser: Observable<User | null> = this.authGmailService.getUser();
protected localUser: Observable<User | null> = this.authStateService.getUser();



logOut() {
throw new Error('Method not implemented.');
}

}
