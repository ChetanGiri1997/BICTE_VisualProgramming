namespace EmployeeManagementSystem.Models
{
    public class Qualification
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public string Course { get; set; }
        public int YearPassed { get; set; }
        public decimal MarksPercentage { get; set; }
    }
}