using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Termin_5.Exceptions.Order
{
    public class OrderNotFoundException : Exception
    {
        public OrderNotFoundException(string message) : base(message) { }
    }
}
