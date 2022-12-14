using Microsoft.EntityFrameworkCore.Migrations;

namespace Termin_5.Migrations
{
    public partial class latlonadded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "Lat",
                table: "Orders",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "Lon",
                table: "Orders",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Lat",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Lon",
                table: "Orders");
        }
    }
}
