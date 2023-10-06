﻿using Microsoft.EntityFrameworkCore;

namespace API_Grafica_Prix.Models
{
    public class PrixContext: DbContext
    {

        public PrixContext(DbContextOptions options): base(options) 
        {
        }

        public DbSet<Usuario> usuarios { get; set; }
        public DbSet<Produto> produtos { get; set; }
        public DbSet<Categoria> categorias { get; set; }

    }
}
