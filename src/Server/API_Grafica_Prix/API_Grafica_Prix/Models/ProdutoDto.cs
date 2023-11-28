using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Net.Sockets;

namespace API_Grafica_Prix.Models
{
    public class ProdutoDto
    {
        public int Id { get; set; }

        public string Nome { get; set; }

        public string Descricao { get; set; }
        public string? Observacao { get; set; }

        public decimal Preco { get; set; }
        public int? Quantidade { get; set; }
        public decimal? Promocao { get; set; }

        public string? Cor { get; set; }

        public string? Tamanho { get; set; }

    }
}
