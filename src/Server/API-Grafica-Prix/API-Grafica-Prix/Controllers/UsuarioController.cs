using API_Grafica_Prix.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API_Grafica_Prix.Controllers
{
    
    
        //[Authorize]
        [Route("api/[controller]")]
        [ApiController]
        public class UsuarioController : ControllerBase
        {
            private readonly PrixContext _context;

            public UsuarioController(PrixContext context)
            {
                _context = context;
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

            var existiEmail= await _context.usuarios.FirstOrDefaultAsync(u=>u.Email==model.Email);
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
            [HttpPost("{Autenticacao}")]
            public async Task<ActionResult> Autenticacao(AutenticacaoDto model)
            {
                var dbusuario = await _context.usuarios.FirstOrDefaultAsync(c => c.Email == model.Email);

                if (dbusuario == null || !BCrypt.Net.BCrypt.Verify(model.Senha, dbusuario.Senha))
                    return Unauthorized();

                var jwt = GerarJwtToken(dbusuario);

                return Ok(new { jwtToken = jwt, dbusuario = dbusuario });
            }

            private object GerarJwtToken(Usuario model)
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("g7IZLOhJHi5q4nPHBW2bkm7EgBfeii2F");
                var claims = new ClaimsIdentity(new Claim[]
                {
                new Claim(ClaimTypes.NameIdentifier,model.Id.ToString())
                });

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = claims,
                    Expires = DateTime.UtcNow.AddHours(2),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)

                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
        }
    }
