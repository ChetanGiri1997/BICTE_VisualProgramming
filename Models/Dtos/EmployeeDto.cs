namespace EmployeeManagementSystem.Models
{
    public class EmployeeDto
    {
        public string Name { get; set; }
        public DateTime DOB { get; set; }
        public string Address { get; set; }
        public string Contact { get; set; }
        public List<QualificationDto> Qualifications { get; set; } = new();
    }
}