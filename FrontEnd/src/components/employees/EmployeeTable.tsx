import React from 'react';
import { Link } from 'react-router-dom';
import { Employee } from '../../services/employeeService';
import { format } from 'date-fns';
import { Edit, Trash2, GraduationCap } from 'lucide-react';
import Button from '../ui/Button';

interface EmployeeTableProps {
  employees: Employee[];
  onViewQualifications: (employee: Employee) => void;
  onDelete: (id: number) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  onViewQualifications,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date of Birth
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Qualifications
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee) => (
            <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">{employee.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-600">
                  {format(new Date(employee.dob), 'MMMM d, yyyy')}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-600 truncate max-w-[200px]" title={employee.address}>
                  {employee.address}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-600">{employee.contact}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewQualifications(employee)}
                  className="inline-flex items-center text-primary-600 hover:text-primary-800"
                >
                  <GraduationCap className="h-4 w-4 mr-1" />
                  View ({employee.qualifications.length})
                </Button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center space-x-2 justify-end">
                  <Link to={`/employees/edit/${employee.id}`}>
                    <Button variant="outline" size="sm" className="inline-flex items-center">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only md:not-sr-only md:ml-1">Edit</span>
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="inline-flex items-center text-error-700 border-error-300 hover:bg-error-50"
                    onClick={() => onDelete(employee.id!)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only md:not-sr-only md:ml-1">Delete</span>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;