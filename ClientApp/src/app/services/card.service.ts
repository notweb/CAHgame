import { Injectable } from '@angular/core';
import { card } from '../card';
import { gamecard } from '../gamecard';
import { HttpClient } from '@angular/common/http';
// import { CARDS, GAMECARDS } from './seed-data';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  url = 'https://localhost:5001';

  // getCards(): card[] {
  //   return CARDS;
  // }

  // getGameCards(): gamecard[] {
  //   return GAMECARDS;
  // }

  constructor(private http: HttpClient) { }

  getDealerCards() {
    // return this.http.get('${this.url}/api/cards/getDealerCards')
    return this.http.get('/api/cards/getDealerCards')
  }

  getPlayerCards() {
    return this.http.get('/api/cards/getPlayerCards')
  }

  getCardsInPlay() {
    return this.http.get('/api/cards/getCardsInPlay')
  }

  playCard(): void {
    // this.http.post('api/cards/playCard')
    // this.getCardsInPlay()
  }
}
