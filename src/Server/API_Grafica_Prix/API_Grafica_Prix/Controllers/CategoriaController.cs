using API_Grafica_Prix.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_Grafica_Prix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase
    {
        private readonly PrixContext _context;
        private readonly UsuarioLogado _usuario;

        public CategoriaController(PrixContext context, UsuarioLogado usuario)
        {
            _context = context;
            _usuario = usuario;
        }


        [HttpGet]
        public async Task<IActionResult> ListarTodos()
        {
            var model = await _context.categorias.Include(c => c.Produtos).ToListAsync();
            return Ok(model);
        }


        [HttpPost]
        public async Task<IActionResult> CriarCategoria([FromBody] CategoriaDto categoriaDto)
        {
            if (categoriaDto == null)
            {
                return BadRequest("Dados inválidos");
            }


            var categoria = new Categoria
            {
                Nome = categoriaDto.Nome,
                Descricao = categoriaDto.Descricao,

            };

            _context.categorias.Add(categoria);
            await _context.SaveChangesAsync();

            return Ok("Categoria criada com sucesso.");
        }


        [HttpGet("{id}")]
        public async Task<ActionResult> PesquisarPorId(int id)
        {
            var model = await _context.categorias
                .Include(c => c.Produtos)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (model == null) return NotFound();

            return Ok(model);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> AtualizarCategoria(int id, [FromBody] CategoriaDto model)
        {


            var categoria = await _context.categorias.FirstOrDefaultAsync(c => c.Id == id);

            if (categoria == null) return NotFound();


            categoria.Nome = model.Nome;
            categoria.Descricao = model.Descricao;

            _context.categorias.Update(categoria);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> Deletar(int id)
        {
            var model = await _context.categorias.FindAsync(id);

            if (model == null) return NotFound();

            _context.categorias.Remove(model);
            _context.SaveChanges();

            return Ok();
        }

    }
}
