using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using api.Model;
using System.Drawing;

namespace api.Data
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :
       base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Produto>()
                .HasOne(p => p.Categoria)
                .WithMany(c => c.Produtos)
                .HasForeignKey(p => p.CategoriaId);

            modelBuilder.Entity<Categoria>().HasData(
                new Categoria { Id = 1, Nome = "Casa" },
                new Categoria { Id = 2, Nome = "Eletroeletrônicos" }
            );

            modelBuilder.Entity<Produto>().HasData(
                new Produto { Id = 1, CategoriaId = 1, Nome = "Mesa", Preco = 200 },
                new Produto { Id = 2, CategoriaId = 1, Nome = "Cadeira", Preco = 120 },
                new Produto { Id = 3, CategoriaId = 2, Nome = "Smartphone", Preco = 1200 },
                new Produto { Id = 4, CategoriaId = 2, Nome = "Fone Bluetooth", Preco = 300 },
                new Produto { Id = 5, CategoriaId = 2, Nome = "SmartTV", Preco = 700 }
            );
        }

        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Produto> Produtos { get; set; }
    }
}
