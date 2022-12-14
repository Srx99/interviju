using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Termin_5.Exceptions.User
{
    public class UserNotFountException : Exception
    {
        public UserNotFountException(string message) : base(message)
        {

        }
    }
}
