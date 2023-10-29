using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API_Grafica_Prix.Migrations
{
    /// <inheritdoc />
    public partial class _02 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AdicionarProdutoOrcamentoId",
                table: "Produtos",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "adicionarProdutos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UsuarioId = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_adicionarProdutos", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Produtos_AdicionarProdutoOrcamentoId",
                table: "Produtos",
                column: "AdicionarProdutoOrcamentoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Produtos_adicionarProdutos_AdicionarProdutoOrcamentoId",
                table: "Produtos",
                column: "AdicionarProdutoOrcamentoId",
                principalTable: "adicionarProdutos",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Produtos_adicionarProdutos_AdicionarProdutoOrcamentoId",
                table: "Produtos");

            migrationBuilder.DropTable(
                name: "adicionarProdutos");

            migrationBuilder.DropIndex(
                name: "IX_Produtos_AdicionarProdutoOrcamentoId",
                table: "Produtos");

            migrationBuilder.DropColumn(
                name: "AdicionarProdutoOrcamentoId",
                table: "Produtos");
        }
    }
}
