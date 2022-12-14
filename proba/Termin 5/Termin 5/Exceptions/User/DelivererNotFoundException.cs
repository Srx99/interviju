using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Termin_5.Exceptions.User
{
    public class DelivererNotFoundException : Exception
    {
        public DelivererNotFoundException(string message) : base(message)
        {

        }
    }
}
