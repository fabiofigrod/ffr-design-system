import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

// Models
import { Credentials } from './models/credentials';
import { AuthResponse } from './models/auth-response';
import { DecodedToken } from './models/decoded-token';

import * as jwt_decode from 'jwt-decode';


export const LOCAL_STORAGE_JWT = 'JWT_TOKEN';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  token: string;
  decodedToken: DecodedToken;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private httpClient: HttpClient) { }

  login(credentials: Credentials): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(environment.authentication.host.login, credentials).pipe(
      catchError((err) => {
        this.logout();
        return throwError(err);
      }),
      tap((res) => {
        this.registerLogin(res.token);
      })
    );
  }

  registerLogin(token: string): void {
    this.storeToken(token);
    this.isLoggedIn = true;
    this.token = token;
    this.decodedToken = this.decodeToken(token);
  }

  logout(): void {
    this.removeToken();
    this.isLoggedIn = false;
    this.token = undefined;
    this.decodedToken = undefined;
  }

  isAuthenticated(): Observable<AuthResponse> {
    if (this.isLoggedIn) {
      return of({ token: this.token, decodedToken: this.decodedToken });
    } else {
      const localJwt = localStorage.getItem(LOCAL_STORAGE_JWT);
      if (localJwt) {
        return this.verifyToken(localJwt);
      } else {
        return throwError('User is not logged in');
      }
    }
  }

  verifyToken(token: string): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(environment.authentication.host.verifyToken, { token }).pipe(
      catchError((err) => {
        this.logout();
        return throwError(err);
      }),
      tap((data) => {
        this.registerLogin(data.token);
      })
    );
  }

  storeToken(token: string): void {
    localStorage.setItem(LOCAL_STORAGE_JWT, token);
  }

  removeToken(): void {
    localStorage.removeItem(LOCAL_STORAGE_JWT);
  }

  decodeToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }
}
