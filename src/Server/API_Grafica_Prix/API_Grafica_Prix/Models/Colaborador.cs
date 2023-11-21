using System.ComponentModel.DataAnnotations;

namespace API_Grafica_Prix.Models
{

    public enum Permissao
    {
        Leitura,
        Escrita,
        Admin,
        
    }
    public class Colaborador
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public string Telefone { get; set; }
        [Required]
        public string Senha { get; set; }
        
        public string Cpf { get; set; }
        public string? Endereco { get; set; }

        public Permissao Permissao { get; set; }
    }

    
}
