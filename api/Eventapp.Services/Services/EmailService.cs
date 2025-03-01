using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Eventapp.Services.Interfaces;

namespace Eventapp.Services;

public class EmailService : IEmailService
{
    private const string GmailSmtp = "smtp.gmail.com";
    private const int SmtpPort = 587;
    private const string GmailUsername = "oscarbarbaa+dev@gmail.com";
    private const string appPassword = "bmyv arqs jukl qtbw";
    public EmailService()
    {

    }

    public async Task SendAsync(string[] to, string subject, string body)
    {
        using var smtp = new SmtpClient(GmailSmtp, SmtpPort);
        smtp.Credentials = new NetworkCredential(GmailUsername, appPassword);
        smtp.EnableSsl = true;

        foreach (var toEmail in to)
        {

            var message = new MailMessage(GmailUsername, toEmail, subject, body)
            {
                IsBodyHtml = true // Set to true if sending HTML emails
            };
            await smtp.SendMailAsync(message);
            Console.WriteLine($"Email sent to {toEmail}");
        }
    }
}