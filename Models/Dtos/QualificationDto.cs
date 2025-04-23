namespace EmployeeManagementSystem.Models
{
    public class QualificationDto
    {
        public int? Id { get; set; }
        public string Course { get; set; }
        public int YearPassed { get; set; }
        public decimal MarksPercentage { get; set; }
    }
}