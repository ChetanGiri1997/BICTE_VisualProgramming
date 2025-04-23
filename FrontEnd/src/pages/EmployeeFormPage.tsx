import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { employeeService, Employee, Qualification } from '../services/employeeService';
import EmployeeForm from '../components/employees/EmployeeForm';
import { toast } from '../utils/toast';
import Spinner from '../components/ui/Spinner';
import Button from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

const EmployeeFormPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      fetchEmployee(Number(id));
    } else {
      // Set default empty employee for create mode
      setEmployee({
        name: '',
        dob: '',
        address: '',
        contact: '',
        qualifications: []
      });
    }
  }, [id, isEditMode]);

  const fetchEmployee = async (employeeId: number) => {
    try {
      setLoading(true);
      const data = await employeeService.getEmployee(employeeId);
      setEmployee(data);
    } catch (error) {
      console.error('Error fetching employee:', error);
      toast.error('Failed to load employee data');
      navigate('/employees');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: Employee) => {
    try {
      setSubmitting(true);
      if (isEditMode) {
        await employeeService.updateEmployee(Number(id), formData);
        toast.success('Employee updated successfully');
      } else {
        await employeeService.createEmployee(formData);
        toast.success('Employee created successfully');
      }
      navigate('/employees');
    } catch (error) {
      console.error('Error saving employee:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/employees')}
          className="mb-2 text-gray-600"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Employees
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">
          {isEditMode ? 'Edit Employee' : 'Add New Employee'}
        </h1>
      </div>

      {employee && (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <EmployeeForm 
            initialData={employee} 
            onSubmit={handleSubmit} 
            isSubmitting={submitting} 
          />
        </div>
      )}
    </div>
  );
};

export default EmployeeFormPage;