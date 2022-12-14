using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Termin_5.Exceptions.Dish
{
    public class DishNotFoundException : Exception
    {
        public DishNotFoundException(string message): base(message)
        {

        }
    }
}
