using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

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
        [Required]
        public decimal Preco { get; set; }
        public int? Quantidade { get; set; }
        public decimal? Promocao { get; set; }

        public string? Cor { get; set; }

        public string? Tamanho { get; set; }

        public byte[]? Imagem { get; set; }

        [ForeignKey("Categoria")]
        public int CategoriaId { get; set; }






    }
}
