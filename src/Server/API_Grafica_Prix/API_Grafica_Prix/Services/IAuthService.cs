using API_Grafica_Prix.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_Grafica_Prix.Services
{
    public interface IAuthService
    {
        Task<ActionResult> AuthenticateUser(AutenticacaoDto model);
    }

    public class AuthService : IAuthService
    {
        private readonly PrixContext _context;
        private readonly IJwtService _jwtService;

        public AuthService(PrixContext context, IJwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        public async Task<ActionResult> AuthenticateUser(AutenticacaoDto model)
        {
            var dbusuario = await _context.usuarios.FirstOrDefaultAsync(c => c.Email == model.Email);
            var dbcolaborador = await _context.colaboradores.FirstOrDefaultAsync(u => u.Email == model.Email);

            if (dbusuario != null && BCrypt.Net.BCrypt.Verify(model.Senha, dbusuario.Senha))
            {
                var jwt = _jwtService.GenerateToken(dbusuario);
                return new OkObjectResult(new { jwtToken = jwt, user = dbusuario });
            }

            if (dbcolaborador != null && BCrypt.Net.BCrypt.Verify(model.Senha, dbcolaborador.Senha))
            {
                var jwt = _jwtService.GenerateToken(dbcolaborador);
                return new OkObjectResult(new { jwtToken = jwt, user = dbcolaborador });
            }

            return new UnauthorizedResult();
        }
    }


}
