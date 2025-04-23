import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { employeeService, Employee } from '../services/employeeService';
import Button from '../components/ui/Button';
import EmployeeTable from '../components/employees/EmployeeTable';
import { PlusCircle } from 'lucide-react';
import QualificationsModal from '../components/employees/QualificationsModal';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import { toast } from '../utils/toast';
import Spinner from '../components/ui/Spinner';

const EmployeeListPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showQualificationsModal, setShowQualificationsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await employeeService.getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewQualifications = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowQualificationsModal(true);
  };

  const handleDeleteClick = (id: number) => {
    setEmployeeToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!employeeToDelete) return;
    
    try {
      setDeleteLoading(true);
      await employeeService.deleteEmployee(employeeToDelete);
      setEmployees(prev => prev.filter(emp => emp.id !== employeeToDelete));
      toast.success('Employee deleted successfully');
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting employee:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Employees</h1>
        <Link to="/employees/create">
          <Button className="flex items-center">
            <PlusCircle className="h-4 w-4 mr-1" />
            Add Employee
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : employees.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-2">No employees found</h3>
          <p className="text-gray-500 mb-4">Get started by adding your first employee</p>
          <Link to="/employees/create">
            <Button className="inline-flex items-center">
              <PlusCircle className="h-4 w-4 mr-1" />
              Add Employee
            </Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <EmployeeTable 
            employees={employees}
            onViewQualifications={handleViewQualifications}
            onDelete={handleDeleteClick}
          />
        </div>
      )}

      {/* Qualifications Modal */}
      {selectedEmployee && (
        <QualificationsModal
          isOpen={showQualificationsModal}
          onClose={() => setShowQualificationsModal(false)}
          employee={selectedEmployee}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Employee"
        message="Are you sure you want to delete this employee? This action cannot be undone."
        confirmText="Delete"
        confirmVariant="danger"
        loading={deleteLoading}
      />
    </div>
  );
};

export default EmployeeListPage;