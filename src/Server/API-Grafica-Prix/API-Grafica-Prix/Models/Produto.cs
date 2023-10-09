using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_Grafica_Prix.Models
{

    [Table("Produtos")]
    public class Produto
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public string Descricao { get; set; }
        public string? Observacao { get; set; }
        public decimal? Preco { get; set; }
        public int? Quantidade { get; set; }
        public string? Promocao { get; set; }

        public byte[]? Imagem { get; set; }




    }
}
