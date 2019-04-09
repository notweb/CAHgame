import { Component, OnInit } from '@angular/core';
import { card } from '../card';
// import { gamecard } from '../gamecard';
import { CardService } from '../services/card.service';
import { SignalrService } from '../services/signalr.service';
import { HttpClient } from '@angular/common/http';
import { HubConnection } from '@aspnet/signalr'
import * as signalR from "@aspnet/signalr";

// TODO: Add option for a player to pause their game, allowing the game to go on without them if they need to step away

@Component({
  selector: 'app-cardlist',
  templateUrl: './cardlist.component.html',
  styleUrls: ['./cardlist.component.css']
})
export class CardlistComponent implements OnInit {
  private _hubConnection: HubConnection | undefined;
  public async: any;
  allPlayerCards: card[];
  playerCards: card[];
  allDealerCards: card[];
  currentDealerCard: card;
  playerHand: card[];
  selectedCard: card;
  prevSelected: card;
  cardsInPlay: card[] = [];
  nullCard: card = { Id: -1, Type: 2, Content: null };
  
  onSelected(card: card): void {
    
    this.prevSelected = this.selectedCard;
    this.selectedCard = card;

    // if (!this.prevSelected) {
    //   this.currentGameCard.sentence = this.currentGameCard.sentence.replace("blank", this.selectedCard.content);
    // } else {
    //   this.currentGameCard.sentence = this.currentGameCard.sentence.replace(this.prevSelected.content, this.selectedCard.content);
    // }
  }

   getAllDealerCards(): void {
    this.cardService.getDealerCards().subscribe((data: card[]) => {this.allDealerCards = data;});
  }

  getAllPlayerCards(): void {
    this.cardService.getPlayerCards().subscribe((result: card[]) => {this.allPlayerCards = result;});
  }

  newDealerCard(): void {
    // Get a random card index from the dealer deck
    var index: number = Math.floor(Math.random() * this.allDealerCards.length);

    // Use the random index above to select a random card from the dealer deck
    this.currentDealerCard = this.allDealerCards[index];
    if (this._hubConnection) {
      this._hubConnection.invoke('SendDealerCard', this.currentDealerCard);
    }
  }

  shuffleDeck(deck: card[]): card[] {
    // Shuffle the deck of cards submitted to this method
    deck.sort(() => 0.5 - Math.random());
    return deck;
  }

  getCardsInPlay(): void {
    // Display card played by each player on the screen
    this.cardService.getCardsInPlay().subscribe((cards: card[]) => {this.cardsInPlay = cards});
  }

  submitCard(): void {
    // TODO: method to deal with submitted card
    this.sendMessage(this.selectedCard);

    // Remove selected card from the player's deck
    if (this.selectedCard.Id == -1) {}
    else {
      this.playerHand.splice(this.playerHand.indexOf(this.selectedCard), 1)
      this.selectedCard = {Content: null, Type: null, Id: -1};
    }

    // TODO: Highlight the card player submitted

    // Disable submit button so you can only submit once per round
    document.getElementById("submitCard").setAttribute("disabled", "true");
    
    
    // TODO: Do something with the 'You' label in the p:layer list indicating user has made his/her move
  }

  drawPlayerCards(): void {
    // Get total number of cards in player's hand
    var totalCards: number = this.playerHand.length;

    // Get total number of cards in player deck
    var numAllCards: number = (this.allPlayerCards.length) - 1;

    // Draw new cards until player's hand has 10 total cards
    while ( totalCards < 10 ) {
      var randomNumber: number = Math.floor(Math.random() * numAllCards);
      this.playerHand.push(this.allPlayerCards[randomNumber])
      totalCards++;
    }
    // TODO: remove the cards added to playerHand from this.allPlayerCards
    
  }

  initializePlayerHand(): void {
    // Shuffle player cards
    var shuffled = this.shuffleDeck(this.allPlayerCards);

    // Get the first 10 cards from the shuffled deck
    this.playerHand = shuffled.slice(0, 10);

    // Send 10 new cards to each player via SignalR
    if (this._hubConnection) {
      this._hubConnection.invoke("SendPlayerHand", this.allPlayerCards);
    }
  }

  newGame(): void {
    // Initialize player and dealer decks
    this.getAllPlayerCards();
    this.getAllDealerCards();
    
    // Get a random dealer card from the deck
    this.newDealerCard();

    // Initialize player hand
    this.initializePlayerHand();

    // Initialize spot for played card
    this.selectedCard = this.nullCard;

    // Disable new game button
    this.disableNewGameButton(true);
  }

  constructor(private cardService: CardService, private signalrService: SignalrService, private http: HttpClient) {}

  public sendMessage(card: card): void {
    // const data = this.selectedCard;

    if (this._hubConnection) {
        this._hubConnection.invoke('SendPlayedCard', card);
    }
  }

  public disableNewGameButton(status: boolean): void {
    this._hubConnection.invoke("DisableNewGameButton", status);
  }
 
  ngOnInit() {
    // Create new SignalR hub connection
    this._hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:5001/hub')
            .configureLogging(signalR.LogLevel.Information)
            .build();
 
    // Start SignalR hub connection
    this._hubConnection.start().catch(err => console.error(err.toString()));
 
    // SignalR listener for displaying cards played by each player
    this._hubConnection.on('cardReceived', (card: card) => {
            // const received = data;
            this.cardsInPlay.push(card);
    });

    // SignalR listener for initializing new dealer card
    this._hubConnection.on("dealerCardReceived", (card: card) => {
      this.currentDealerCard = card;
    });

    // SignalR listener for initializing hand for each player
    this._hubConnection.on("playerHandReceived", (cards: card[]) => {
      // Shuffle all player cards
      var shuffled = this.shuffleDeck(cards);
      // Load 10 cards for each player
      this.playerHand = shuffled.slice(0, 10);
      // Load 10 cards for players
      // this.playerHand = c;
    });

    // SignalR listener for disabling new game button
    this._hubConnection.on("newGameButtonStatus", (status: boolean) => {
      document.getElementById("newGameButton").setAttribute("disabled", status.toString());
    });

    // Start a new game
    // TODO: Find out why this doesn't initialize dealer and player cards
    this.newGame();
  }
}
