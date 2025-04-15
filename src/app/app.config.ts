import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { environment } from '../environment/environment';
import { getFunctions } from 'firebase/functions';


// Inicializa o Firebase
 const firebaseApp = initializeApp(environment.firebase)
 const firestore = getFirestore(firebaseApp);
 const auth = getAuth(firebaseApp);
 const functions = getFunctions(firebaseApp);




export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    // Fornece as instâncias do Firebase para injeção de dependência
    { provide: 'FIREBASE_APP', useValue: firebaseApp },
    { provide: 'FIREBASE_FIRESTORE', useValue: firestore },
    { provide: 'FIREBASE_AUTH', useValue: auth },
    { provide: 'FIREBASE_FUNCTIONS', useValue: functions }




  ]
};
