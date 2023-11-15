using API_Grafica_Prix.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_Grafica_Prix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BannerController : ControllerBase
    {
        public readonly PrixContext _context;

        public BannerController(PrixContext context)
        {
            _context = context;
        }


        [HttpPost]
        [Authorize(Roles = "Admin, Escrita")]
        public async Task<IActionResult> CriarBanner([FromForm] IFormFile Imagem)
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
                    var banner = new Banner
                    {
                        Imagem = imagemBytes
                    };
                    _context.banners.Add(banner);
                    await _context.SaveChangesAsync();

                    return Ok("Produto criado com sucesso.");

                }
                    catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro interno do servidor: {ex.Message}");
            }
        }

        [HttpGet]
        [Authorize(Roles = "Admin, Escrita")]
        public IActionResult GetBanners()
        {
            try
            {
                var banners = _context.banners.ToList();
                return Ok(banners);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro interno do servidor: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin, Escrita")]
        public IActionResult GetById(int id)
        {
            try
            {
                var banner = _context.banners.FirstOrDefault(b => b.Id == id);
                if (banner == null)
                {
                    return NotFound("Banner não encontrado.");
                }
                return Ok(banner);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro interno do servidor: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin, Escrita")]
        public async Task<IActionResult> Deletar(int id)
        {
            try
            {
                var banner = await _context.banners.FindAsync(id);
                if (banner == null)
                {
                    return NotFound("Banner não encontrado.");
                }

                _context.banners.Remove(banner);
                await _context.SaveChangesAsync();

                return Ok("Banner excluído com sucesso.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro interno do servidor: {ex.Message}");
            }
        }

    }
}
