using API_Grafica_Prix.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API_Grafica_Prix.Services
{
    public interface IJwtService
    {
        string GenerateToken(object user);
    }

    public class JwtService : IJwtService
    {
        private readonly JwtSettings _jwtSettings;

        public JwtService(IOptions<JwtSettings> jwtSettings)
        {
            _jwtSettings = jwtSettings.Value;
        }

        public string GenerateToken(object user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSettings.SecretKey);

            if (user is Usuario)
            {
                var model = (Usuario)user;

                var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, model.Id.ToString()),
            new Claim(ClaimTypes.Email, model.Email),
            new Claim(ClaimTypes.Name, model.Name.ToString())
        };

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.UtcNow.AddHours(2),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
            else if (user is Colaborador)
            {
                var model = (Colaborador)user;

                var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, model.Id.ToString()),
            new Claim(ClaimTypes.Email, model.Email),
        };

                // Adicionar a reivindicação de permissão com base na propriedade do Colaborador
                foreach (Permissao permissao in Enum.GetValues(typeof(Permissao)))
                {
                    if (model.Permissao.HasFlag(permissao))
                    {
                        claims.Add(new Claim(ClaimTypes.Role, permissao.ToString()));
                    }
                }

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.UtcNow.AddHours(2),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
            return null;
        }

        //public string GenerateToken(object user)
        //{
        //    if (user is Usuario)
        //    {
        //        var model = (Usuario)user;
        //        var tokenHandler = new JwtSecurityTokenHandler();
        //        var key = Encoding.ASCII.GetBytes(_jwtSettings.SecretKey);

        //        var claims = new ClaimsIdentity(new Claim[]
        //        {
        //        new Claim(ClaimTypes.NameIdentifier, model.Id.ToString()),
        //        new Claim(ClaimTypes.Email, model.Email),
        //        new Claim(ClaimTypes.Name, model.Name.ToString())

        //        });

        //        var tokenDescriptor = new SecurityTokenDescriptor
        //        {
        //            Subject = claims,
        //            Expires = DateTime.UtcNow.AddHours(2),
        //            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
        //                SecurityAlgorithms.HmacSha256Signature)
        //        };

        //        var token = tokenHandler.CreateToken(tokenDescriptor);
        //        return tokenHandler.WriteToken(token);
        //    }
        //    else if (user is Colaborador)
        //    {
        //        var model = (Colaborador)user;
        //        var tokenHandler = new JwtSecurityTokenHandler();
        //        var key = Encoding.ASCII.GetBytes(_jwtSettings.SecretKey);

        //        var claims = new ClaimsIdentity(new Claim[]
        //        {
        //        new Claim(ClaimTypes.NameIdentifier, model.Id.ToString()),
        //        new Claim(ClaimTypes.Email, model.Email),
        //        new Claim("Permissao", "Admin"),
        //        new Claim("Permissao", "Escrita"),
        //        new Claim("Permissao", "Leitura")

        //        });

        //        var tokenDescriptor = new SecurityTokenDescriptor
        //        {
        //            Subject = claims,
        //            Expires = DateTime.UtcNow.AddHours(2),
        //            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
        //                SecurityAlgorithms.HmacSha256Signature)
        //        };

        //        var token = tokenHandler.CreateToken(tokenDescriptor);
        //        return tokenHandler.WriteToken(token);
        //    }

        //    return null;
        //}
    }

}
