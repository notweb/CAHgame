using System;
using System.Linq;
using CAHgame.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace CAHgame.Data
{
    public class CardsService : ICardsService
    {
        private readonly CardDbContext _context;
        
        public CardsService(CardDbContext context)
        {
            _context = context;
        }

        public async Task<List<Card>> getDealerCards()
        {
            var dealerCards = await (from c in _context.cards where c.Type == 2 select c).ToListAsync();
            return dealerCards;
        }

        public async Task<List<Card>> getPlayerCards()
        {
            var playerCards = await (from c in _context.cards where c.Type == 1 select c).ToListAsync();
            return playerCards;
        }
    }
}   