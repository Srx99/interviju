using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Termin_5.Models;

namespace Termin_5.Infrastructure
{
    public class FacultyDbContext : DbContext
    {

        //Ovde definisemo DbSetove (tabele)
        //public DbSet<Student> Students { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Dish> Dishes { get; set; }

        public DbSet<Deliverer> Deliverers { get; set; }

        public DbSet<Order> Orders { get; set; }


        public FacultyDbContext( DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //Kazemo mu da pronadje sve konfiguracije u Assembliju i da ih primeni nad bazom
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(FacultyDbContext).Assembly);  
        }
    }
}
