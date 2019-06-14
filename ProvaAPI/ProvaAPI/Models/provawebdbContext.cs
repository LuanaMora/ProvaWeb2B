using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ProvaAPI.Models
{
    public partial class provawebdbContext : DbContext
    {
        public provawebdbContext()
        {
        }

        public provawebdbContext(DbContextOptions<provawebdbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Animal> Animal { get; set; }
        public virtual DbSet<Vacina> Vacina { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseNpgsql("Server=localhost;Database=provawebdb;Port=5432;User Id=postgres;Password=admin;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Animal>(entity =>
            {
                entity.HasKey(e => e.IdAnimal);

                entity.ToTable("animal");

                entity.Property(e => e.IdAnimal)
                    .HasColumnName("id_animal")
                    .ValueGeneratedNever();

                entity.Property(e => e.Descricao)
                    .HasColumnName("descricao")
                    .HasColumnType("character varying");
            });

            modelBuilder.Entity<Vacina>(entity =>
            {
                entity.HasKey(e => e.IdVacina);

                entity.ToTable("vacina");

                entity.Property(e => e.IdVacina)
                    .HasColumnName("id_vacina")
                    .ValueGeneratedNever();

                entity.Property(e => e.Aplicador)
                    .HasColumnName("aplicador")
                    .HasColumnType("character varying");

                entity.Property(e => e.Descricaomedicamento)
                    .HasColumnName("descricaomedicamento")
                    .HasColumnType("character varying");

                entity.Property(e => e.Dosagem).HasColumnName("dosagem");

                entity.Property(e => e.DtVacina)
                    .HasColumnName("dt_vacina")
                    .HasColumnType("date");

                entity.Property(e => e.IdAnimal).HasColumnName("id_animal");

                entity.Property(e => e.Peso).HasColumnName("peso");

                entity.HasOne(d => d.IdAnimalNavigation)
                    .WithMany(p => p.Vacina)
                    .HasForeignKey(d => d.IdAnimal)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("animal_vacina_fk");
            });
        }
    }
}
