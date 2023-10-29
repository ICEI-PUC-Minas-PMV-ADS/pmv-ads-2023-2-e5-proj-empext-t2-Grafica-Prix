namespace API_Grafica_Prix.Models
{
    public class AtualizacaoSenhaDto
    {
        public int Id { get; set; }
        public string SenhaAtual { get; set; }
        public string NovaSenha { get; set; }
        public string ConfirmacaoSenha { get; set; }
    }
}
