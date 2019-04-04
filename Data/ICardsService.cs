using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CAHgame.Models;

namespace CAHgame.Data
{
    public interface ICardsService
    {
        Task<List<Card>> getPlayerCards();

        Task<List<Card>> getDealerCards();
    }
}