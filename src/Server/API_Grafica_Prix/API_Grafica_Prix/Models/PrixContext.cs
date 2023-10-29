using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace API_Grafica_Prix.Models
{
    public class PrixContext: DbContext
    {

        public PrixContext(DbContextOptions options): base(options) 
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Categoria>()
                .HasMany(c => c.Produtos) // Remova esta linha
                .WithOne()
                .HasForeignKey(p => p.CategoriaId);
        }


        public DbSet<Usuario> usuarios { get; set; }
        public DbSet<Produto> produtos { get; set; }
        public DbSet<Categoria> categorias { get; set; }

        public DbSet<Orcamento> orcamentos { get; set; }

        public DbSet<Banner> banners { get; set; }

        public DbSet<AdicionarProdutoOrcamento> adicionarProdutos { get; set; }


    }
}
