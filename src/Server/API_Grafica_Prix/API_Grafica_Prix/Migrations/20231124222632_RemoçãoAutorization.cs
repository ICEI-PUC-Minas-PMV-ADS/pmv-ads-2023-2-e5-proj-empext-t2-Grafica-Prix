using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API_Grafica_Prix.Migrations
{
    /// <inheritdoc />
    public partial class RemoçãoAutorization : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Permissao",
                table: "colaboradores");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Permissao",
                table: "colaboradores",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
