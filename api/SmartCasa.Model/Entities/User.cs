using Microsoft.AspNetCore.Identity;

namespace SmartCasa.Model.Entities
{
    public class User : IdentityUser<int>
    {
        public Member? Member { get; set; }
    }
}
