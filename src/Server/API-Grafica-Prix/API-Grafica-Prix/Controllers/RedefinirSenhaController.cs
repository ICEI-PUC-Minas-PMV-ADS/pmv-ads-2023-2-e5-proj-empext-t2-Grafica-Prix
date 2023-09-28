using API_Grafica_Prix.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Grafica_Prix.Services;

namespace API_Grafica_Prix.Controllers
{
    [Route("api/redefinir-senha")]
    [ApiController]
    public class RedefinirSenhaController : ControllerBase
    {
        private readonly PrixContext _context;
        private readonly IEmailService _emailService; 
        private readonly ISenhaService _senhaService;

        public RedefinirSenhaController(PrixContext context, IEmailService emailService, ISenhaService senhaService)
        {
            _context = context;
            _emailService = emailService;
            _senhaService = senhaService;
        }


        [HttpPost("solicitar")]
        [AllowAnonymous]
        public async Task<IActionResult> SolicitarRedefinicaoSenha([FromBody] EnvioEmailDto model)
        {
            var usuario = await _context.usuarios.FirstOrDefaultAsync(c => c.Email == model.Email);
            if (usuario == null)
            {
                return BadRequest("Usuário não encontrado.");
            }

            
            string novaSenha = _senhaService.GerarSenhaAleatoria(6); 

            
            usuario.Senha = BCrypt.Net.BCrypt.HashPassword(novaSenha);
            _context.usuarios.Update(usuario);
            await _context.SaveChangesAsync();

            
            await _emailService.EnviarEmailRedefinicaoSenha(model.Email, novaSenha);

            return Ok(new { mensagem = "Um email com a nova senha foi enviado." });
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult> AtualizarSenha(int id, AtualizacaoSenhaDto model)
        {
            if (id != model.Id) return BadRequest();

            var usuario = await _context.usuarios.FirstOrDefaultAsync(c => c.Id == id);

            if (usuario == null) return BadRequest();

            if (!BCrypt.Net.BCrypt.Verify(model.SenhaAtual, usuario.Senha))
            {
                return BadRequest("Senha atual incorreta.");
            }

            
            if (model.NovaSenha != model.ConfirmacaoSenha)
            {
                return BadRequest("A nova senha e a confirmação de senha não coincidem.");
            }

            
            usuario.Senha = BCrypt.Net.BCrypt.HashPassword(model.NovaSenha);

            _context.usuarios.Update(usuario);
            await _context.SaveChangesAsync();

            return NoContent();
        }


    }
}
