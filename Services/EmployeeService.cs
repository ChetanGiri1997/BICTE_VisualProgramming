using Microsoft.EntityFrameworkCore;
using EmployeeManagementSystem.Data;
using EmployeeManagementSystem.Models;

namespace EmployeeManagementSystem.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly AppDbContext _context;

        public EmployeeService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Employee>> GetAll()
        {
            return await _context.Employees
                .Include(e => e.Qualifications)
                .ToListAsync();
        }

        public async Task<Employee> GetById(int id)
        {
            return await _context.Employees
                .Include(e => e.Qualifications)
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<Employee> Create(EmployeeDto employeeDto, int userId)
        {
            if (string.IsNullOrWhiteSpace(employeeDto.Name) || 
                employeeDto.Qualifications.Any(q => string.IsNullOrWhiteSpace(q.Course)))
                throw new ArgumentException("Invalid employee data");

            var employee = new Employee
            {
                UserId = userId,
                Name = employeeDto.Name,
                DOB = employeeDto.DOB,
                Address = employeeDto.Address,
                Contact = employeeDto.Contact,
                Qualifications = employeeDto.Qualifications.Select(q => new Qualification
                {
                    Course = q.Course,
                    YearPassed = q.YearPassed,
                    MarksPercentage = q.MarksPercentage
                }).ToList()
            };

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task Update(int id, EmployeeDto employeeDto)
        {
            var employee = await _context.Employees
                .Include(e => e.Qualifications)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (employee == null)
                throw new KeyNotFoundException("Employee not found");

            employee.Name = employeeDto.Name;
            employee.DOB = employeeDto.DOB;
            employee.Address = employeeDto.Address;
            employee.Contact = employeeDto.Contact;

            _context.Qualifications.RemoveRange(employee.Qualifications);
            employee.Qualifications = employeeDto.Qualifications.Select(q => new Qualification
            {
                EmployeeId = id,
                Course = q.Course,
                YearPassed = q.YearPassed,
                MarksPercentage = q.MarksPercentage
            }).ToList();

            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var employee = await _context.Employees
                .Include(e => e.Qualifications)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (employee == null)
                throw new KeyNotFoundException("Employee not found");

            _context.Qualifications.RemoveRange(employee.Qualifications);
            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
        }
    }
}