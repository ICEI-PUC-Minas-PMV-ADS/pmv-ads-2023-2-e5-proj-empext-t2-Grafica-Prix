using System.Security.Claims;

namespace API_Grafica_Prix.Models
{
    public class UsuarioLogado
    {
        private readonly IHttpContextAccessor _accessor;

        public UsuarioLogado(IHttpContextAccessor accessor)
        {
            _accessor = accessor;
        }

        public string Email => _accessor.HttpContext.User.Identity.Name;
        public string Name => GetClaimsIdentity().FirstOrDefault(a => a.Type == ClaimTypes.NameIdentifier)?.Value;

        public IEnumerable<Claim> GetClaimsIdentity()
        {
            return _accessor.HttpContext.User.Claims;
        }
    }
}
