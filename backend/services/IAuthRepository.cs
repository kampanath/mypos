using backend.Models;

namespace backend.services
{
    public interface IAuthRepository
    {
        void Register(Users user);
        (Users, string) Login(Users user);
    }
}