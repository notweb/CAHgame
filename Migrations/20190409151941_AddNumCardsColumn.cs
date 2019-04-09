using Microsoft.EntityFrameworkCore.Migrations;

namespace CAHgame.Migrations
{
    public partial class AddNumCardsColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NumCards",
                table: "cards",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumCards",
                table: "cards");
        }
    }
}
