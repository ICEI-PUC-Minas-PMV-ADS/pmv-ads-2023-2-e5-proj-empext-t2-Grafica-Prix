using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_Grafica_Prix.Models
{
    [Table("Orçamentos")]
    public class Orcamento
    {
        [Key]
        public int Id { get; set; }
        public string UsuarioId { get; set; }
        public List<Produto> Produtos { get; set; }
        public DateTime DataCriacao { get; set; }
        public bool Fechado { get; set; }
    }
}
