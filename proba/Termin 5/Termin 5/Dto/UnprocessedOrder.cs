using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Termin_5.Dto
{
    public class UnprocessedOrder
    {
        public int Id { get; set; }
        public string DishName { get; set; }
        public string OrderAddress { get; set; }
        public string Comentar { get; set; }
        public double Price { get; set; }
        public string Status { get; set; }

        public double Lat { get; set; }
        public double Lon { get; set; }

    }
}
