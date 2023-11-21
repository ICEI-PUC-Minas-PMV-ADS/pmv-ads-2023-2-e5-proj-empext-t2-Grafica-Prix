namespace API_Grafica_Prix.Models
{
    public class ProdutoComImagem
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public string Observacao { get; set; }
        public decimal Preco { get; set; }
        public int? Quantidade { get; set; }
        public string Promocao { get; set; }
        public string ImagemBase64 { get; set; }
        public int CategoriaId { get; set; }
    }
}
