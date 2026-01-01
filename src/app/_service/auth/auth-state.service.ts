// auth-state.service.ts
import {
  EnvironmentInjector,
  inject,
  Injectable,
  runInInjectionContext,
  VERSION,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth, authState,  User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private angularV: string | null = ' Version.' + VERSION.full;
  private auth = inject(Auth);
  private injector = inject(EnvironmentInjector);

  private currentUser$ = new BehaviorSubject<User | null>(null);

  private authReady$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  angularVersion(): string | null {
    return this.angularV;
  }


  initAuthListener(): void {

    runInInjectionContext(this.injector, () => {
      authState(this.auth).subscribe({
        next: (user) => {
          this.currentUser$.next(user), this.authReady$.next(true); /* 🔥 Firebase respondeu*/
        },
        error: (err) => console.error('[AuthState]', err),
      });
    });
  }


  setUser(user: User | null): void {
    this.currentUser$.next(user);
  }


  getUser(): Observable<User | null> {
    return this.currentUser$.asObservable();
  }


  getCurrentUser(): User | null {
    return this.currentUser$.value;
  }

  isAuthenticated(): boolean {
    return this.currentUser$.value !== null;
  }


  isAuthReady(): Observable<boolean> {
    return this.authReady$.asObservable();
  }
}
