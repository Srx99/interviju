using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Termin_5.Exceptions.User
{
    public class UserWrongDataException : Exception
    {
        public UserWrongDataException(string message) : base(message) { }
    }
}
