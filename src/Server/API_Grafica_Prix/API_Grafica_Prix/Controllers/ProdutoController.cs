using API_Grafica_Prix.Models;
using API_Grafica_Prix.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;

namespace API_Grafica_Prix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutoController : ControllerBase
    {
        private readonly PrixContext _context;

        public ProdutoController(PrixContext context)
        {
            _context = context;
        }

        [HttpGet]

        public async Task<IActionResult> ListarTodos()
        {
            var model = await _context.produtos.ToListAsync();
            return Ok(model);
        }


        [HttpPost]
        public async Task<IActionResult> CriarProduto([FromForm] IFormFile Imagem, [FromForm] Produto Model)
        {
            try
            {

                byte[] imagemBytes = null;
                if (Imagem != null)
                {

                    long tamanhoMaximo = 5 * 1024 * 1024; // 5 MB
                    if (Imagem.Length > tamanhoMaximo)
                    {
                        return BadRequest("O tamanho da imagem excede o limite permitido.");
                    }


                    using (var memoryStream = new MemoryStream())
                    {
                        await Imagem.CopyToAsync(memoryStream);
                        imagemBytes = memoryStream.ToArray();
                    }
                }


                var produto = new Produto
                {
                    Nome = Model.Nome,
                    Descricao = Model.Descricao,
                    Observacao = Model.Observacao,
                    Preco = Model.Preco,
                    Quantidade = Model.Quantidade,
                    Promocao = Model.Promocao,
                    Imagem = imagemBytes,
                    CategoriaId = Model.CategoriaId
                };


                _context.produtos.Add(produto);
                await _context.SaveChangesAsync();

                return Ok("Produto criado com sucesso.");

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro interno do servidor: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> PesquisarPorId(int id)
        {
            var produto = await _context.produtos
                .FirstOrDefaultAsync(c => c.Id == id);

            if (produto == null)
            {
                return NotFound();
            }



            return Ok(produto);
        }

        [HttpGet("nome/{nome}")]
        public async Task<ActionResult> PesquisarPorNome(string nome)
        {
            var produto = await _context.produtos
                .Where(p => p.Nome.ToLower().Contains(nome.ToLower()))
                .ToListAsync();

            if (produto == null)
            {
                return NotFound();
            }

            return Ok(produto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> AtualizarProduto(int id, [FromForm] IFormFile Imagem, [FromForm] Produto Model)
        {
            try
            {
                var produtoExistente = await _context.produtos.FirstOrDefaultAsync(p => p.Id == id);

                if (produtoExistente == null)
                {
                    return NotFound();
                }



                produtoExistente.Nome = Model.Nome;
                produtoExistente.Descricao = Model.Descricao;
                produtoExistente.Observacao = Model.Observacao;
                produtoExistente.Preco = Model.Preco;
                produtoExistente.Quantidade = Model.Quantidade;
                produtoExistente.Promocao = Model.Promocao;


                // Se houver uma nova imagem, atualize-a
                if (Imagem != null)
                {
                    long tamanhoMaximo = 5 * 1024 * 1024; // 5 MB
                    if (Imagem.Length > tamanhoMaximo)
                    {
                        return BadRequest("O tamanho da imagem excede o limite permitido.");
                    }

                    using (var memoryStream = new MemoryStream())
                    {
                        await Imagem.CopyToAsync(memoryStream);
                        produtoExistente.Imagem = memoryStream.ToArray();
                    }
                }

                _context.produtos.Update(produtoExistente);
                await _context.SaveChangesAsync();

                return Ok("Produto atualizado com sucesso.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro interno do servidor: {ex.Message}");
            }
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> Deletar(int id)
        {
            var model = await _context.produtos.FindAsync(id);

            if (model == null) return NotFound();

            _context.produtos.Remove(model);
            _context.SaveChanges();

            return Ok();
        }

    }
}
