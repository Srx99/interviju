using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Termin_5.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string DishName { get; set; }
        public double Amount { get; set; }
        public string OrderAddress { get; set; }
        public string Comentar { get; set; }
        public double Price { get; set; }
        //public string ClientUsername { get; set; }      //*
        //public string DelivererUsername { get; set; }       //*
        public int ClientId { get; set; }
        public int? DelivererId { get; set; }
        public string Status { get; set; }
        public string Time { get; set; }
        public double Lat { get; set; }
        public double Lon { get; set; }

        public User Client { get; set; }
        public Deliverer Deliverer { get; set; }


    }
}
