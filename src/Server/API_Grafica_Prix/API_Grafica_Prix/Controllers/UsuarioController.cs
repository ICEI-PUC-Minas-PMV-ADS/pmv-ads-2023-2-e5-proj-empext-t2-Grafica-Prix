using API_Grafica_Prix.Models;
using API_Grafica_Prix.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace API_Grafica_Prix.Controllers
{


    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly PrixContext _context;
        private readonly IAuthService _authService;

        public UsuarioController(PrixContext context, IAuthService authService)
        {
            _context = context;
            _authService = authService;
        }

        [HttpGet]
        public async Task<ActionResult> ListarTodos()
        {
            var model = await _context.usuarios.ToListAsync();
            return Ok(model);
        }

        [HttpPost]
        public async Task<ActionResult> Criar(Usuario model)
        {

            var existiEmail = await _context.usuarios.FirstOrDefaultAsync(u => u.Email == model.Email);
            if (existiEmail != null)
            {

                return BadRequest("Email já está em uso.");
            }
            var existiCPF = await _context.usuarios.FirstOrDefaultAsync(u => u.Cpf == model.Cpf);
            if (existiCPF != null)
            {

                return BadRequest("CPF já está em uso.");
            }

            model.Senha = BCrypt.Net.BCrypt.HashPassword(model.Senha);

            _context.usuarios.Add(model);
            await _context.SaveChangesAsync();

            return CreatedAtAction("PesquisarPorId", new { id = model.Id }, model);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> PesquisarPorId(int id)
        {
            var model = await _context.usuarios
                .FirstOrDefaultAsync(c => c.Id == id);

            if (model == null) return NotFound();

            return Ok(model);

        }

        [HttpGet("nome/{nome}")]
        public async Task<ActionResult> PesquisarPorNome(string nome)
        {
            var usuario = await _context.usuarios
                .Where(p => p.Name.ToLower().Contains(nome.ToLower()))
                .ToListAsync();

            if (usuario == null)
            {
                return NotFound();
            }

            return Ok(usuario);
        }


        [HttpPut("{id}")]
        public async Task<ActionResult> Atualizar(int id, Usuario model)
        {


            if (id != model.Id) return BadRequest();

            var modelo = await _context.usuarios.
                FirstOrDefaultAsync(c => c.Id == id);

            if (modelo == null) return BadRequest();

            modelo.Name = model.Name;
            modelo.Email = model.Email;
            modelo.Telefone = model.Telefone;
            modelo.Cpf = model.Cpf;
            modelo.Endereco = model.Endereco;
            modelo.Senha = BCrypt.Net.BCrypt.HashPassword(model.Senha);

            _context.usuarios.Update(modelo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Deletar(int id)
        {
            var model = await _context.usuarios.FindAsync(id);

            if (model == null) return NotFound();

            _context.usuarios.Remove(model);
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
