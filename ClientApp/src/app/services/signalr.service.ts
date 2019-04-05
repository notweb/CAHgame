import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { card } from '../card';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  public cardsInPlay: card[];
  private hubConnection: signalR.HubConnection;

  public startConnection = () =>  {
    this.hubConnection = new signalR.HubConnectionBuilder()
                              .withUrl('https://localhost:5001/cardlist')
                              .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log("Error while starting connection: " + err))
  }

  public addCardListListener = () => {
    this.hubConnection.on("cardsInPlay", (cards) => {
      this.cardsInPlay = cards;
      console.log(card)
    });
  }

  constructor() { }
}

