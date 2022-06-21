using Microsoft.AspNetCore.Identity;

namespace API.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(IdentityUser user);
    }
}