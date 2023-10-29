using System.ComponentModel.DataAnnotations.Schema;

namespace API_Grafica_Prix.Models
{
    [Table("Banners")]
    public class Banner
    {
        public int Id { get; set; }

        public byte[] Imagem { get; set; }
    }
}
