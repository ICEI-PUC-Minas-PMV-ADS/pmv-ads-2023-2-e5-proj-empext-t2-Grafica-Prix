using System.Text;

namespace API_Grafica_Prix.Services
{
    public interface ISenhaService
    {
        string GerarSenhaAleatoria(int comprimento);
    }

    public class SenhaService : ISenhaService
    {
        private const string CaracteresPermitidos = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        public string GerarSenhaAleatoria(int comprimento)
        {
            var random = new Random();
            var senha = new StringBuilder(comprimento);

            for (int i = 0; i < comprimento; i++)
            {
                int index = random.Next(0, CaracteresPermitidos.Length);
                senha.Append(CaracteresPermitidos[index]);
            }

            return senha.ToString();
        }
    }

}
