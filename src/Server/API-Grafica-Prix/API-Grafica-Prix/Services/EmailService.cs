using System.Net.Mail;
using System.Net;

namespace API_Grafica_Prix.Services
{
    public interface IEmailService
    {
        Task EnviarEmailRedefinicaoSenha(string destinatario, string novaSenha);
    }

    public class EmailService : IEmailService
    {
        public async Task EnviarEmailRedefinicaoSenha(string destinatario, string novaSenha)
        {
            try
            {
                using (SmtpClient smtpClient = new SmtpClient("smtp.gmail.com"))
                {
                    smtpClient.Port = 587; // Porta SMTP (pode variar conforme o servidor)
                    smtpClient.Credentials = new NetworkCredential("prixgraficamg@gmail.com", "ymko ajpm bzyw slbj ");
                    smtpClient.EnableSsl = true; // Habilitar SSL para conexão segura


                    MailMessage mailMessage = new MailMessage
                    {
                        From = new MailAddress("prixgraficamg@gmail.com"),
                        Subject = "Redefinição de Senha",
                        Body = $"Sua nova senha é: {novaSenha}",
                        IsBodyHtml = false, // Você pode configurar como HTML se preferir
                    };

                    mailMessage.To.Add(destinatario);

                    await smtpClient.SendMailAsync(mailMessage);
                }
            }
            catch (Exception ex)
            {
                // Lidar com erros de envio de email (registre ou notifique conforme necessário)
                Console.WriteLine($"Erro ao enviar email: {ex.Message}");
            }
        }
    }

}
