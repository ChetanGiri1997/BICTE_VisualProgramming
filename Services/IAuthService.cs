using EmployeeManagementSystem.Models;

namespace EmployeeManagementSystem.Services
{
    public interface IAuthService
    {
        Task<string> Authenticate(LoginRequest request);
    }
}