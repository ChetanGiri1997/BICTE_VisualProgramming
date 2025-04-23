using EmployeeManagementSystem.Models;

namespace EmployeeManagementSystem.Services
{
    public interface IEmployeeService
    {
        Task<List<Employee>> GetAll();
        Task<Employee> GetById(int id);
        Task<Employee> Create(EmployeeDto employeeDto, int userId);
        Task Update(int id, EmployeeDto employeeDto);
        Task Delete(int id);
    }
}