using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API_Grafica_Prix.Migrations
{
    /// <inheritdoc />
    public partial class ObservcaoOrcamento : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ObservacaoOrcamento",
                table: "TempAdicionarProdutos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ObservacaoOrcamento",
                table: "TempAdicionarProdutos");
        }
    }
}
