using System;
using System.ComponentModel.DataAnnotations;

namespace CAHgame.Models
{
    public class Card
    {
        [Key]
        public int Id { get; set; }

        //  Type of card, either dealer card or player card
        public int Type { get; set; }
        
        public string Content { get; set; }

        public int NumCards { get; set; }
    }
}