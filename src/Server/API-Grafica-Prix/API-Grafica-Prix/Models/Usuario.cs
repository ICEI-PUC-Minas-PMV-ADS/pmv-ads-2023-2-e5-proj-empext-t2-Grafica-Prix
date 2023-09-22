using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_Grafica_Prix.Models
{
    [Table("Usuarios")]
    public class Usuario
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
       
        [Required]
        public string Email { get; set; }
        [Required]

        public string Telefone { get; set; }
        [Required]
        public string Senha { get; set; }

        public string Cpf { get; set; }
        public string Endereco { get; set; }
    }

    public enum Perfil
    {
        Administrador = 1,
        Consultor = 2,
        Usuario= 3
    }
}
