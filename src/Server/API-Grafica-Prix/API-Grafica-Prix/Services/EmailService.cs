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
                    smtpClient.Port = 587;
                    smtpClient.Credentials = new NetworkCredential("prixgraficamg@gmail.com", "ymko ajpm bzyw slbj ");
                    smtpClient.EnableSsl = true;


                    MailMessage mailMessage = new MailMessage
                    {
                        From = new MailAddress("prixgraficamg@gmail.com"),
                        Subject = "Redefinição de Senha",
                        Body = $"Sua nova senha é: {novaSenha}. Clique no link para fazer login e atualizar sua senha: http://localhost:5173/login?next=/profile?form=1",
                        IsBodyHtml = false,
                    };

                    mailMessage.To.Add(destinatario);

                    await smtpClient.SendMailAsync(mailMessage);
                }
            }
            catch (Exception ex)
            {

                Console.WriteLine($"Erro ao enviar Email: {ex.Message}");
            }
        }
    }

}
