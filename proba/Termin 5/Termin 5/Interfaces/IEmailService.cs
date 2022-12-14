using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Termin_5.Interfaces
{
    public interface IEmailService
    {
        public bool SendMail(string to);
    }
}
