using Microsoft.EntityFrameworkCore.Migrations;

namespace Termin_5.Migrations
{
    public partial class imagedeliverer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageURL",
                table: "Deliverers",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageURL",
                table: "Deliverers");
        }
    }
}
