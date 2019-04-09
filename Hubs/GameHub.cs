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

        public async Task SendDealerCard(Card card)
        {
            await Clients.All.SendAsync("dealerCardReceived", card);
        }

        public async Task SendPlayerHand(Card[] cards)
        {
            await Clients.All.SendAsync("playerHandReceived", cards);
        }

        public async Task DisableNewGameButton(bool isDisabled)
        {
            await Clients.All.SendAsync("newGameButtonStatus", isDisabled);
        }
    }
}