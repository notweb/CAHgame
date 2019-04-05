using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CAHgame.Data;
using CAHgame.Models;
using Microsoft.AspNetCore.Mvc;

namespace CAHgame.Controllers
{
    [Route("api/[controller]")]
    public class CardsController : Controller
    {
        private readonly ICardsService _cardService;

        public CardsController(ICardsService cardService)
        {
            _cardService = cardService;
        }

        [HttpGet("[action]")]
        public async Task<List<Card>> getPlayerCards() {
            var playerCards = await _cardService.getPlayerCards();
            return playerCards;
        }

        [HttpGet("[action]")]
        public async Task<List<Card>> getDealerCards() {
            var dealerCards = await _cardService.getDealerCards();
            return dealerCards;
        }

        // TODO: Remove this once signalr is up and running
        [HttpGet("[action]")]
        public List<Card> getCardsInPlay() {
            List<Card> cards = new List<Card>();
            cards.Add( new Card {Id = 1000, Type = 2, Content = "From the cards controller 1"});
            cards.Add( new Card {Id = 1001, Type = 2, Content = "From the cards controller 2"});
            cards.Add( new Card {Id = 1002, Type = 2, Content = "From the cards controller 3"});

            return cards;
        }
        // TODO: Make an admin page where new cards can be added to the deck
        // TODO: SignalR integration
    }
}
