using System;
using System.Threading.Tasks;
using CAHgame.Models;

namespace CAHgame.Hubs
{
    public interface IGameHub
    {
        Task SendPlayerCard(Card card);
    }
}