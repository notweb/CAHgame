import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Router } from '@angular/router';
import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private _idToken: string;
  // private _accessToken: string;
  // private _expiresAt: number;

  auth0 = new auth0.WebAuth({
    clientID: '4R0golJ8-to0vGf8o1BIeJKurNAidtlL',
    domain: 'cahgame.auth0.com',
    // responseType: 'token id_token',
    responseType: 'token',
    redirectUri: 'https://localhost:5001/callback',
    audience: 'https://cahgame.auth0.com/api/v2/',
    scope: 'openid profile email'
  });

  // Store authentication data
  _expiresAt: number;
  _userProfile: any;
  _accessToken: string;
  _authenticated: boolean;

  constructor(public router: Router) {
    this.getAccessToken();
  }

  // get idToken(): string {
  //   return this._idToken;
  // }

  get accessToken(): string {
    return this._accessToken;
  }

  public login(): void {
    this.auth0.authorize()
  }

  handleLoginCallback() {
    // When Auth0 hash parsed, get profile
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = '';
        this.getUserInfo(authResult);
      } else if (err) {
        console.error(`Error: ${err.error}`);
      }
      this.router.navigate(['/']);
    });
  }

  getAccessToken() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken) {
        this.getUserInfo(authResult);
      }
    });
  }

  getUserInfo(authResult) {
    // Use access token to retrieve user's profile and set session
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this._setSession(authResult, profile);
      }
    });
  }

  private _setSession(authResult, profile) {
    // Save authentication data and update login status subject
    this._expiresAt = authResult.expiresIn * 1000 + Date.now();
    this._accessToken = authResult.accessToken;
    this._userProfile = profile;
    this._authenticated = true;
  }

  logout() {
    // Log out of Auth0 session
    // Ensure that returnTo URL is specified in Auth0
    // Application settings for Allowed Logout URLs
    this.auth0.logout({
      returnTo: 'https://localhost:5001',
      clientID: auth0.clientID
    });
  }

  get isLoggedIn(): boolean {
    // Check if current date is before token
    // expiration and user is signed in locally
    return Date.now() < this._expiresAt && this._authenticated;
  }

  public getProfile(cb): void {
    if (!this._accessToken) {
      throw new Error('Access Token must exist to fetch profile');
    }
  
    const self = this;
    this.auth0.client.userInfo(this._accessToken, (err, profile) => {
      if (profile) {
        self._userProfile = profile;
      }
      cb(err, profile);
    });
  }

  // public handleAuthentication(): void {
  //   this.auth0.parseHash((err, authResult) => {
  //     if (authResult && authResult.accessToken && authResult.idToken) {
  //       window.location.hash = '';
  //       this.localLogin(authResult);
  //       this.router.navigate(['/']);
  //     } else if (err) {
  //       this.router.navigate(['/']);
  //       console.log(err);
  //     }
  //   });
  // }

  // private localLogin(authResult): void {
  //   // Set the time that the access token will expire at
  //   const expiresAt = (authResult.expiresIn * 1000) + Date.now();
  //   this._accessToken = authResult.accessToken;
  //   this._idToken = authResult.idToken;
  //   this._expiresAt = expiresAt;
  // }

  // public renewTokens(): void {
  //   this.auth0.checkSession({}, (err, authResult) => {
  //     if (authResult && authResult.accessToken && authResult.idToken) {
  //       this.localLogin(authResult);
  //     } else if (err) {
  //       alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
  //       this.logout();
  //     }
  //   });
  // }

  // public logout(): void {
  //   // Remove tokens and expiry time
  //   this._accessToken = '';
  //   this._idToken = '';
  //   this._expiresAt = 0;
    
  //   this.auth0.logout({
  //     return_to: window.location.origin
  //   });
  // }

  // public isAuthenticated(): boolean {
  //   // Check whether the current time is past the
  //   // access token's expiry time
  //   return this._accessToken && Date.now() < this._expiresAt;
  // }
}
