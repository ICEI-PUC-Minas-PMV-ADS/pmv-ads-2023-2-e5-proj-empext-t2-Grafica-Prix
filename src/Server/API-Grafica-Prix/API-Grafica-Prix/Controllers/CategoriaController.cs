using API_Grafica_Prix.Models;
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

        public CategoriaController (PrixContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<IActionResult> ListarTodos()
        {
            var model = await _context.categorias.ToListAsync();
            return Ok(model);
        }

        [HttpPost]
        public async Task<ActionResult> CriarCategoria(Categoria model)
        {

            _context.categorias.Add(model);
            await _context.SaveChangesAsync();

            return CreatedAtAction("PesquisarPorId", new { id = model.Id }, model);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> PesquisarPorId(int id)
        {
            var model = await _context.categorias
                .FirstOrDefaultAsync(c => c.Id == id);

            if (model == null) return NotFound();

            return Ok(model);

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> AtualizarCategoria(int id, Categoria model)
        {
            if (id != model.Id) return BadRequest();

            var modelo = await _context.categorias.AsNoTracking().
                FirstOrDefaultAsync(c => c.Id == id);

            if (modelo == null) return BadRequest();

            _context.categorias.Update(model);
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
