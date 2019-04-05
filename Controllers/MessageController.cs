using System;
using System.Collections.Generic;
using CAHgame.Hubs;
using CAHgame.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace CAHgame.Controllers
{
    [Route("api/[controller]")]
    public class MessageController : Controller
    {
        private readonly IHubContext<GameHub> _hubContext;
        public MessageController(IHubContext<GameHub> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult SendCard()
        {
           List<Card> cards = new List<Card>();
            cards.Add( new Card {Id = 1000, Type = 2, Content = "From the message controller 1"});
            cards.Add( new Card {Id = 1001, Type = 2, Content = "From the message controller 2"});
            cards.Add( new Card {Id = 1002, Type = 2, Content = "From the message controller 3"});

            _hubContext.Clients.All.SendAsync("cardsInPlay", cards);

            return Ok("Cards in play updated successfully");
        }
    }
}