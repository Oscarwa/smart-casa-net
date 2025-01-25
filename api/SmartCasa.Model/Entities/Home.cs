using System.ComponentModel.DataAnnotations;

namespace SmartCasa.Model;
public class Home
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public string Rules { get; set; }
}