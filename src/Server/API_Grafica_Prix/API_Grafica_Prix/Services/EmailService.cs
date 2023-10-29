using System.Net.Mail;
using System.Net;
using API_Grafica_Prix.Services;
using API_Grafica_Prix.Models;
using Microsoft.Extensions.Options;

namespace API_Grafica_Prix.Services
{
    
    public interface IEmailService
    {
        Task EnviarEmailRedefinicaoSenha(string destinatario, string novaSenha);
        Task EnviarEmailPedidoOrcamento(string destinatario,Usuario usuario, Orcamento orcamento);
    }
}

    public class EmailService : IEmailService
    {

    private readonly IOptions<EmailSettings> _emailSettings;

    public EmailService(IOptions<EmailSettings> emailSettings)
    {
        _emailSettings = emailSettings;
    }



    public async Task EnviarEmailRedefinicaoSenha(string destinatario, string novaSenha)
        {
            try
            {
                using (SmtpClient smtpClient = new SmtpClient("smtp.gmail.com"))
                {
                    smtpClient.Port = 587; 
                    smtpClient.Credentials = new NetworkCredential(_emailSettings.Value.Email, _emailSettings.Value.Senha);
                    smtpClient.EnableSsl = true; 


                    MailMessage mailMessage = new MailMessage
                    {
                        From = new MailAddress("prixgraficamg@gmail.com"),
                        Subject = "Redefinição de Senha",
                        Body = $"Sua nova senha é: {novaSenha}",
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

    public async Task EnviarEmailPedidoOrcamento(string destinatario,Usuario usuario, Orcamento orcamento)
    {
        using (SmtpClient smtpClient = new SmtpClient("smtp.gmail.com"))
        {
            smtpClient.Port = 587;
            smtpClient.Credentials = new NetworkCredential(_emailSettings.Value.Email, _emailSettings.Value.Senha);
            smtpClient.EnableSsl = true;
            destinatario = _emailSettings.Value.Destinatario;

            var message = new MailMessage
            {
                From = new MailAddress(_emailSettings.Value.Email),
                Subject = "Detalhes do Orçamento",
                Body = $"<p style=\"font-size: 12px; font-weight: bold;\">Olá, aqui estão os detalhes do orçamento:</p>\n\n" +
                       $"<p style=\"font-size: 15px; font-weight: bold;\">Nome do Usuário:</p> {usuario.Name}<br />\n" +
                       $"<p style=\"font-size: 15px; font-weight: bold;\">Email do Usuário:</p> {usuario.Email}<br />\n" +
                       "<p  style=\"font-size: 15px; font-weight: bold;\">Produtos:</p>",
                IsBodyHtml = true
            };

            foreach (var produto in orcamento.Produtos)
            {
                message.Body += $"<p style=\"font-size: 16px; font-weight: bold;\">{produto.Nome}</p>";
                message.Body += $"<p style=\"font-size: 16px;\">Preço: {produto.Preco:C}</p>";
                message.Body += $"<p style=\"font-size: 16px;\">Observação: {produto.Observacao}</p>";
            }

            message.To.Add(destinatario);

            await smtpClient.SendMailAsync(message);
        }
    }

}
