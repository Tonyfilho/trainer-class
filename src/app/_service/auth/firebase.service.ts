import { inject, Injectable } from '@angular/core';
import { getAuth, Auth } from 'firebase/auth';
import { environment } from '../../../environments/environment';
import { initializeApp } from 'firebase/app';

@Injectable({ providedIn: 'root' })
export class FirebaseAuthService {
  auth: Auth;

  constructor() {
    const app = initializeApp(environment.firebaseConfig);
    this.auth = getAuth(app);
  }
}
