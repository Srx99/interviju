using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Termin_5.Models;

namespace Termin_5.Infrastructure.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(x => x.Id); //Podesavam primarni kljuc tabele

            builder.Property(x => x.Id).ValueGeneratedOnAdd(); //Kazem da ce se primarni kljuc
                                                               //automatski generisati prilikom dodavanja,
                                                               //redom 1 2 3...

            builder.HasOne(x => x.Client)
                .WithMany(u => u.UserOrders)
                .HasForeignKey(x => x.ClientId);

            builder.HasOne(x => x.Deliverer)
               .WithMany(d => d.DelivererOrders)
               .HasForeignKey(x => x.DelivererId)
               .IsRequired(false);
        }
    }
}
