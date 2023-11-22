using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_Grafica_Prix.Models
{
    [Table("TempAdicionarProdutos")]
    public class AdicionarProdutoOrcamento
    {
        [Key]
        public int Id { get; set; }
        public string UsuarioId { get; set; }
        public List<Produto> Produtos { get; set; }
        public string ObservacaoOrcamento { get; set; }
    }
}
