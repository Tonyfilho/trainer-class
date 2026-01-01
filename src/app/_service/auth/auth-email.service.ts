// auth-email.service.ts
import { inject, Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';
import { from, tap, catchError, throwError } from 'rxjs';

import { Router } from '@angular/router';
import { AuthStateService } from './auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthEmailService {
private  router = inject(Router);
  constructor(
    private auth: Auth,
    private authState: AuthStateService
  ) {}

  /**
   * Login com email e senha.
   * Em caso de erro, o erro é capturado via RxJS
   * e registado no console.
   */
  login(email: string, password: string) {
    return from(
      signInWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      tap(result => {
        this.authState.setUser(result.user);
        console.log("emailService: ", result.user );
      }),
      catchError(error => {
        console.error('Erro ao fazer login com email:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Registo de novo utilizador.
   * O utilizador fica autenticado após sucesso.
   */
  register(email: string, password: string) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      tap(result => {
        this.authState.setUser(result.user);
      }),
      catchError(error => {
        console.error('Erro ao registar utilizador:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Logout do utilizador autenticado.
   */
  logout() {
    return from(
      signOut(this.auth)
    ).pipe(
      tap(() => {
        this.authState.setUser(null);
        this.router.navigateByUrl("/");
      }),
      catchError(error => {
        console.error('Erro ao efetuar logout (email):', error);
        return throwError(() => error);
      })
    );
  }
}
