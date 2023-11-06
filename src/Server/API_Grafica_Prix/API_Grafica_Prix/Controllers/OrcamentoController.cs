using API_Grafica_Prix.Models;
using API_Grafica_Prix.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Writers;
using System.Security.Claims;

namespace API_Grafica_Prix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrcamentoController : ControllerBase
    {
        private readonly PrixContext _context;
        private readonly IEmailService _emailService;

        public OrcamentoController(PrixContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        [HttpPost("adicionar-ao-orcamento")]
        [Authorize]
        public async Task<IActionResult> AdicionarAoOrcamento([FromBody] Produto produto)
        {
            if (produto == null)
            {
                return BadRequest("Produto inválido.");
            }

            var usuarioId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            // Verifique se o produto já existe no banco de dados
            var produtoExistente = await _context.produtos.FirstOrDefaultAsync(p => p.Id == produto.Id);

            if (produtoExistente == null)
            {
                return BadRequest("Produto não encontrado no banco de dados.");
            }

            var carrinhoExistente = await _context.adicionarProdutos.FirstOrDefaultAsync(c => c.UsuarioId == usuarioId);

            if (carrinhoExistente == null)
            {
                var carrinho = new AdicionarProdutoOrcamento
                {
                    UsuarioId = usuarioId,
                    Produtos = new List<Produto> { produtoExistente }
                };

                _context.adicionarProdutos.Add(carrinho);
            }
            else
            {
                if (carrinhoExistente.Produtos == null)
                {
                    carrinhoExistente.Produtos = new List<Produto>();
                }
                carrinhoExistente.Produtos.Add(produtoExistente); 
            }

            await _context.SaveChangesAsync();

            return Ok("Produto adicionado ao carrinho de orçamento.");
        }

      

        [HttpPost("concluir-orcamento")]
        [Authorize]
        public async Task<IActionResult> ConcluirOrcamento()
        {
            var usuario = new Usuario
            {
                Name = User.FindFirst(ClaimTypes.Name)?.Value, 
                Email = User.FindFirst(ClaimTypes.Email)?.Value, 
                                                                 
            };

            var usuarioId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var carrinhoTemporario = await _context.adicionarProdutos.Include(c => c.Produtos).FirstOrDefaultAsync(c => c.UsuarioId == usuarioId);

            var destinatario = "raphael.latini@gmail.com";

            if (carrinhoTemporario != null)
            {
                
                var orcamento = new Orcamento
                {
                    UsuarioId = usuarioId,
                    Produtos = carrinhoTemporario.Produtos,
                    DataCriacao = DateTime.Now,
                    Fechado = false 
                };

                
                _context.orcamentos.Add(orcamento);

                
                _context.adicionarProdutos.Remove(carrinhoTemporario);

                
                await _context.SaveChangesAsync();

                await _emailService.EnviarEmailPedidoOrcamento( destinatario, usuario, orcamento);

                return Ok("Orçamento criado e produtos transferidos com sucesso.");
            }
            else
            {
                return NotFound("Carrinho temporário vazio ou não encontrado.");
            }
        }

        [HttpGet("orcamento/{orcamentoId}")]
        public async Task<IActionResult> ObterDetalhesDoOrcamento(int orcamentoId)
        {
            
            var orcamento = await _context.orcamentos.Include(o => o.Produtos).FirstOrDefaultAsync(o => o.Id == orcamentoId);

            if (orcamento != null)
            {
                return Ok(orcamento);
            }
            else
            {
                return NotFound("Orçamento não encontrado.");
            }
        }

        [HttpGet("produtos-mais-colocados")]
        public async Task<IActionResult> ProdutosMaisColocados()
        {
            var ultimoMes = DateTime.Today.AddMonths(-1);

            var produtosMaisColocados = await _context.orcamentos
                .Where(o => o.DataCriacao >= ultimoMes)
                .SelectMany(o => o.Produtos) 
                .GroupBy(p => p.Id) 
                .OrderByDescending(g => g.Count()) 
                .Take(3) 
                .Select(g => g.Key) 
                .ToListAsync();

            
                 var produtosDetalhes = await _context.produtos
                .Where(p => produtosMaisColocados.Contains(p.Id))
                .ToListAsync();

            return Ok(produtosDetalhes);
        }


        [HttpPatch("orcamento/{orcamentoId}/atualizar-status")]
        public async Task<IActionResult> AtualizarStatusDoOrcamento(int orcamentoId, [FromBody] bool novoStatus)
        {
            var orcamento = await _context.orcamentos.FirstOrDefaultAsync(o => o.Id == orcamentoId);

            if (orcamento == null)
            {
                return NotFound("Orçamento não encontrado.");
            }

            // Atualize o status do orçamento com o novoStatus fornecido no corpo da solicitação.
            orcamento.Fechado = novoStatus;

            _context.orcamentos.Update(orcamento);
            await _context.SaveChangesAsync();

            return Ok("Status do orçamento atualizado com sucesso.");
        }



        [HttpDelete("remover-do-orcamento/{produtoId}")]
        public async Task<IActionResult> RemoverDoOrcamento(int produtoId)
        {
           

            var usuarioId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value; 

           
            var carrinhoTemporario = await _context.adicionarProdutos.FirstOrDefaultAsync(c => c.UsuarioId == usuarioId);

            if (carrinhoTemporario != null)
            {
                
                var produtoParaRemover = carrinhoTemporario.Produtos.FirstOrDefault(p => p.Id == produtoId);

                if (produtoParaRemover != null)
                {
                    
                    carrinhoTemporario.Produtos.Remove(produtoParaRemover);

                    
                    await _context.SaveChangesAsync();

                    return Ok("Produto removido do carrinho de orçamento.");
                }
                else
                {
                    return NotFound("Produto não encontrado no carrinho.");
                }
            }
            else
            {
                return NotFound("Carrinho temporário vazio ou não encontrado.");
            }
        }



    }

}
