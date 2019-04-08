using CAHgame.Models;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace CAHgame.Hubs
{
    public class GameHub : Hub
    {
        public async Task SendPlayedCard(Card card)
        {
            await Clients.All.SendAsync("cardReceived", card);
        }
    }
}