using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Termin_5.Dto
{
    public class OrderDisplayDto
    {
        public int Id { get; set; }
        public string DishName { get; set; }
        public string OrderAddress { get; set; }
        public string Comentar { get; set; }
        public double Price { get; set; }
        public string Status { get; set; }
        public string Time { get; set; }
    }
}
