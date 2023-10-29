using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API_Grafica_Prix.Migrations
{
    /// <inheritdoc />
    public partial class _03 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Produtos_adicionarProdutos_AdicionarProdutoOrcamentoId",
                table: "Produtos");

            migrationBuilder.DropForeignKey(
                name: "FK_Produtos_orcamentos_OrcamentoId",
                table: "Produtos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_banners",
                table: "banners");

            migrationBuilder.DropPrimaryKey(
                name: "PK_orcamentos",
                table: "orcamentos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_adicionarProdutos",
                table: "adicionarProdutos");

            migrationBuilder.RenameTable(
                name: "banners",
                newName: "Banners");

            migrationBuilder.RenameTable(
                name: "orcamentos",
                newName: "Orçamentos");

            migrationBuilder.RenameTable(
                name: "adicionarProdutos",
                newName: "TempAdicionarProdutos");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Banners",
                table: "Banners",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Orçamentos",
                table: "Orçamentos",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TempAdicionarProdutos",
                table: "TempAdicionarProdutos",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Produtos_Orçamentos_OrcamentoId",
                table: "Produtos",
                column: "OrcamentoId",
                principalTable: "Orçamentos",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Produtos_TempAdicionarProdutos_AdicionarProdutoOrcamentoId",
                table: "Produtos",
                column: "AdicionarProdutoOrcamentoId",
                principalTable: "TempAdicionarProdutos",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Produtos_Orçamentos_OrcamentoId",
                table: "Produtos");

            migrationBuilder.DropForeignKey(
                name: "FK_Produtos_TempAdicionarProdutos_AdicionarProdutoOrcamentoId",
                table: "Produtos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Banners",
                table: "Banners");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TempAdicionarProdutos",
                table: "TempAdicionarProdutos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Orçamentos",
                table: "Orçamentos");

            migrationBuilder.RenameTable(
                name: "Banners",
                newName: "banners");

            migrationBuilder.RenameTable(
                name: "TempAdicionarProdutos",
                newName: "adicionarProdutos");

            migrationBuilder.RenameTable(
                name: "Orçamentos",
                newName: "orcamentos");

            migrationBuilder.AddPrimaryKey(
                name: "PK_banners",
                table: "banners",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_adicionarProdutos",
                table: "adicionarProdutos",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_orcamentos",
                table: "orcamentos",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Produtos_adicionarProdutos_AdicionarProdutoOrcamentoId",
                table: "Produtos",
                column: "AdicionarProdutoOrcamentoId",
                principalTable: "adicionarProdutos",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Produtos_orcamentos_OrcamentoId",
                table: "Produtos",
                column: "OrcamentoId",
                principalTable: "orcamentos",
                principalColumn: "Id");
        }
    }
}
