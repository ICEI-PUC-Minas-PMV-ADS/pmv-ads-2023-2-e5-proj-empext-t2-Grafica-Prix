using API_Grafica_Prix.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace API_Grafica_Prix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuemSomosController : ControllerBase
    {
        private readonly PrixContext _context;

        public QuemSomosController(PrixContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> ListarTodos()
        {
            var model = await _context.quemSomos.ToListAsync();
            return Ok(model);
        }

        [HttpPost]
        public async Task<ActionResult> Criar([FromBody] QuemSomos model)
        {

            _context.quemSomos.Add(model);
            await _context.SaveChangesAsync();

            return CreatedAtAction("PesquisarPorId", new { id = model.Id }, model);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Atualizar(int id, QuemSomos model)
        {


            if (id != model.Id) return BadRequest();

            var modelo = await _context.quemSomos.
                FirstOrDefaultAsync(c => c.Id == id);

            if (modelo == null) return BadRequest();

            modelo.Titulo = model.Titulo;
            modelo.Descricao = model.Descricao;


            _context.quemSomos.Update(modelo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
