import { Component, OnInit } from '@angular/core';
import { card } from '../card';
// import { gamecard } from '../gamecard';
import { CardService } from '../services/card.service';
import { SignalrService } from '../services/signalr.service';
import { HttpClient } from '@angular/common/http';


// TODO: Add option for a player to pause their game, allowing the game to go on without them if they need to step away

@Component({
  selector: 'app-cardlist',
  templateUrl: './cardlist.component.html',
  styleUrls: ['./cardlist.component.css']
})
export class CardlistComponent implements OnInit {
  allPlayerCards: card[];
  playerCards: card[];
  allDealerCards: card[];
  currentDealerCard: card;
  playerHand: card[];
  selectedCard: card;
  prevSelected: card;
  cardsInPlay: card[];
  // nullCard: card = { Id: -1, Type: 2, Content: null };
  
  onSelected(card: card): void {
    
    this.prevSelected = this.selectedCard;
    this.selectedCard = card;

    // if (!this.prevSelected) {
    //   this.currentGameCard.sentence = this.currentGameCard.sentence.replace("blank", this.selectedCard.content);
    // } else {
    //   this.currentGameCard.sentence = this.currentGameCard.sentence.replace(this.prevSelected.content, this.selectedCard.content);
    // }
     
  }

  // getAllPlayerCards(): void {
  //   this.allPlayerCards = this.cardService.getCards();
  // }

  // getPlayerHand(): void {
  //   this.getAllPlayerCards();
  // }

  // getAllDealerCards(): void {
  //   this.allDealerCards = this.cardService.getDealerCards();
  // }

  // newGame(): void {
  //   // Get all player and dealer cards
  //   this.cardService.getPlayerCards().subscribe((result: card[]) => {this.allPlayerCards = result;});
  //   this.cardService.getDealerCards().subscribe((data: card[]) => {this.allDealerCards = data;});

  //   // Reset player selected card
  //   this.selectedCard = null;
  //   this.prevSelected = null;

  //   // Shuffle all player cards
  //   // this.shuffled = this.allPlayerCards.sort(() => 0.5 - Math.random());

  //   // Load 10 cards for players
  //   this.playerHand = this.shuffled.slice(0, 10);

  //   // Get a random dealer card from the deck
  //   var index: number = Math.floor(Math.random() * this.allDealerCards.length);
  //   this.currentDealerCard = this.allDealerCards[index];
  // }

  getAllDealerCards(): void {
    this.cardService.getDealerCards().subscribe((data: card[]) => {this.allDealerCards = data;});
  }

  getAllPlayerCards(): void {
    this.cardService.getPlayerCards().subscribe((result: card[]) => {this.allPlayerCards = result;});
  }

  newDealerCard(): void {
    var index: number = Math.floor(Math.random() * this.allDealerCards.length);
    this.currentDealerCard = this.allDealerCards[index];
  }

  shuffleDeck(deck: card[]): card[] {
    deck.sort(() => 0.5 - Math.random());
    return deck;
  }

  getCardsInPlay(): void {
    this.cardService.getCardsInPlay().subscribe((cards: card[]) => {this.cardsInPlay = cards});
  }

  submitCard(): void {
    // TODO: method to deal with submitted card

    // Remove selected card from the player's deck
    if (this.selectedCard.Id == -1) {}
    else {
      this.playerHand.splice(this.playerHand.indexOf(this.selectedCard), 1)
      this.selectedCard = {Content: null, Type: null, Id: -1};
    }
    
    // TODO: Do something with the 'You' label in the p:layer list indicating user has made his/her move
  }

  drawPlayerCards(): void {
    var totalCards: number = this.playerHand.length;
    var numAllCards: number = (this.allPlayerCards.length) - 1;
    while ( totalCards < 10 ) {
      var randomNumber: number = Math.floor(Math.random() * numAllCards);
      this.playerHand.push(this.allPlayerCards[randomNumber])
      totalCards++;
    }
    // TODO: remove the cards added to playerHand from this.allPlayerCards
    
    // this.playerHand.forEach((c => console.log(c.Content)));
  }

  newGame(): void {
    // Initialize player and dealer decks
    this.getAllPlayerCards();
    this.getAllDealerCards();
    
    // Get a random dealer card from the deck
    this.newDealerCard();

    // Shuffle player cards
    var shuffled = this.shuffleDeck(this.allPlayerCards);

    // Load 10 cards for players
    this.playerHand = shuffled.slice(0, 10);

    // Initialize spot for played card
    //this.selectedCard = this.nullCard;
  }

  constructor(private cardService: CardService, private signalrService: SignalrService, private http: HttpClient) {
   }

  ngOnInit() {
    this.signalrService.startConnection();
    this.signalrService.addCardListListener();
    this.newGame();
  }

  private startHttpRequest = () => {
    this.http.get('https://localhost:5001/api/message/sendcard')
      .subscribe(res => {
      console.log(res);
    })
  }
}
