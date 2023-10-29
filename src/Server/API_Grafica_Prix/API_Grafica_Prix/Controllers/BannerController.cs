﻿using API_Grafica_Prix.Models;
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
    }
}
