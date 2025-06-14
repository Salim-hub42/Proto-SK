import { Injectable } from '@angular/core';
import { Observable, of, delay, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  redirectUrl: string;


  login(name: string, password: string): Observable<boolean> {
    const isLoggedIn = (name === 'root' && password === 'root');
    return of(isLoggedIn).pipe(
      delay(1000),
      tap(isLoggedIn => this.isLoggedIn = isLoggedIn)
    );
  }




  logout() {
    this.isLoggedIn = false;
  }






}
