// auth-google.service.ts
import { inject, Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut } from '@angular/fire/auth';
import { from, tap, catchError, throwError } from 'rxjs';
import { AuthStateService } from './auth-state.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogleService {

  private  router = inject(Router);
  /**
   * Provider responsável pelo login com Google (OAuth 2.0)
   */

  private provider = new GoogleAuthProvider();

  constructor(private auth: Auth, private authState: AuthStateService) {}

   /**
   * Realiza login com Google via popup.
   * Emite o resultado como Observable.
   */
  loginWithGoogle() {
    return from(signInWithPopup(this.auth, this.provider)).pipe(
      tap((result) => {
        // Atualiza o estado global com o utilizador autenticado
        this.authState.setUser(result.user);
         console.log("googleService: ", result.user );
      }),
      catchError((error) => {
        console.error('Erro ao autenticar com Google:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Logout do utilizador autenticado via Google.
   */
  logOut() {
    return from(signOut(this.auth)).pipe(
      tap(() => {
        this.authState.setUser(null);
        this.router.navigateByUrl("/");
      }),
      catchError((error) => {
        console.error('Erro ao efetuar logout (Google):', error);
        return throwError(() => error);
      })
    );
  }
}
