using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Termin_5.Interfaces;
using MailKit.Net.Smtp;
using MailKit;
using MimeKit;
using MailKit.Security;
using Microsoft.Extensions.Configuration;

namespace Termin_5.Services
{
    public class EmailService : IEmailService
    {
        MimeMessage message;
        private readonly IConfiguration Configuration;

        public EmailService(IConfiguration configuration)
        {
            message = new MimeMessage();
            Configuration = configuration;
            message.From.Add(MailboxAddress.Parse(Configuration["Email"]));
            message.To.Add(MailboxAddress.Parse(Configuration["Email"]));
            //message.From.Add(MailboxAddress.Parse("webtestwebtest76@gmail.com"));
            //message.To.Add(MailboxAddress.Parse("srx.99ug@gmail.com"));
        }

        public bool SendMail(string to)
        {
            message.Subject = "ŽOLT";
            message.Body = new TextPart("plain")
            {
                Text = @"Hello,
                        Your delivery request has been accepted!"
            };

            // MailKit.Net.Smtp.SmtpClient client = new MailKit.Net.Smtp.SmtpClient();
            using (var client = new SmtpClient())
            {


                try
                {
                    //client.Connect("smtp.hotmail.com", 465, true);
                    //client.Connect("smtp.mail.yahoo.com", 465, true);
                    //client.Connect("smtp.live.email", 465, SecureSocketOptions.StartTls);
                    client.CheckCertificateRevocation = false;
                    client.Connect("smtp.office365.com", 587, false);
                    client.Authenticate(Configuration["Email"], Configuration["Password"]);
                    client.Send(message);

                    //client.Connect("smtp.gmail.com", 465, true);
                    //client.AuthenticationMechanisms.Remove("XOAUTH2");
                    //client.Authenticate("webtestwebtest76", "gtlddqlodtqnndku");
                    //client.Send(message);
                    //return true;


                    return true;
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);

                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();

                }
            }
        }
    }
}
