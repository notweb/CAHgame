using CAHgame.Models;
using Microsoft.EntityFrameworkCore;

namespace CAHgame.Data
{
    public class CardDbContext : DbContext
    {
         
        public CardDbContext(DbContextOptions<CardDbContext> options) 
            :base(options)
        { }
        
        public DbSet<Card> cards { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=cards.db");
        }
    }
}