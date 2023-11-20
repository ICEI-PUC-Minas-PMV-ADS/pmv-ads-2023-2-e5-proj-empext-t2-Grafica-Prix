using API_Grafica_Prix.Models;
using API_Grafica_Prix.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_Grafica_Prix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ColaboradorController : ControllerBase
    {
        private readonly PrixContext _context;
        private readonly IAuthService _authService;

        public ColaboradorController(PrixContext context, IAuthService authService)
        {
            _context = context;
            _authService = authService;
        }
        [HttpGet]
        public async Task<ActionResult> ListarTodos()
        {
            var model = await _context.colaboradores.ToListAsync();
            return Ok(model);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> PesquisarPorId(int id)
        {
            var model = await _context.colaboradores
                .FirstOrDefaultAsync(c => c.Id == id);

            if (model == null) return NotFound();

            return Ok(model);

        }
        [HttpPost]
        public async Task<ActionResult> Criar(Colaborador model)
        {
            try
            {
                var existiEmail = await _context.colaboradores.FirstOrDefaultAsync(u => u.Email == model.Email);
                if (existiEmail != null)
                {
                    return BadRequest("Email já está em uso.");
                }

                var existiCPF = await _context.colaboradores.FirstOrDefaultAsync(u => u.Cpf == model.Cpf);
                if (existiCPF != null)
                {
                    return BadRequest("CPF já está em uso.");
                }

                model.Senha = BCrypt.Net.BCrypt.HashPassword(model.Senha);

                // Verifique se a permissão foi passada corretamente no objeto model
                if (!Enum.IsDefined(typeof(Permissao), model.Permissao))
                {
                    return BadRequest("Permissão inválida.");
                }

                _context.colaboradores.Add(model);
                await _context.SaveChangesAsync();

                return CreatedAtAction("PesquisarPorId", new { id = model.Id }, model);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro interno do servidor: {ex.Message}");
            }
        }



        [HttpPut("{id}")]
        public async Task<ActionResult> Atualizar(int id, Colaborador model)
        {


            if (id != model.Id) return BadRequest();

            var modelo = await _context.colaboradores.
                FirstOrDefaultAsync(c => c.Id == id);

            if (modelo == null) return BadRequest();

            modelo.Nome = model.Nome;
            modelo.Email = model.Email;
            modelo.Telefone = model.Telefone;
            modelo.Cpf = model.Cpf;
            modelo.Endereco = model.Endereco;
            modelo.Senha = BCrypt.Net.BCrypt.HashPassword(model.Senha);

            _context.colaboradores.Update(modelo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Deletar(int id)
        {
            var model = await _context.colaboradores.FindAsync(id);

            if (model == null) return NotFound();

            _context.colaboradores.Remove(model);
            _context.SaveChanges();

            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("Autenticacao")]
        public async Task<ActionResult> Autenticacao(AutenticacaoDto model)
        {
            return await _authService.AuthenticateUser(model);
        }

    }
}
