using Microsoft.AspNetCore.Identity;

namespace Eventapp.Model.Entities
{
    public class User : IdentityUser<int>
    {
        public List<Event>? Events { get; set; }
    }
}
