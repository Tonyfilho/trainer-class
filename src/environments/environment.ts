

import { keys } from "./environment.keys";

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: keys.firebaseApiKey,
    authDomain: "ebook-angular-dev-hit.firebaseapp.com",
    projectId: "ebook-angular-dev-hit",
    storageBucket: "ebook-angular-dev-hit.firebasestorage.app",
    messagingSenderId: "576636567121",
    appId: "1:576636567121:web:559d4455700fc9bdc74270"
  },
  weatherKey: keys.weatherKey,
  reqresKey: keys.reqresKey

}


