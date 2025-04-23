import React from 'react';
import Modal from '../ui/Modal';
import { Employee } from '../../services/employeeService';
import { GraduationCap } from 'lucide-react';

interface QualificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee;
}

const QualificationsModal: React.FC<QualificationsModalProps> = ({
  isOpen,
  onClose,
  employee,
}) => {
  if (!employee) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${employee.name}'s Qualifications`}
      size="lg"
    >
      <div className="py-2">
        {employee.qualifications.length === 0 ? (
          <div className="text-center py-8">
            <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">No qualifications found</h3>
            <p className="text-gray-500">This employee doesn't have any qualifications recorded.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year Passed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Marks Percentage
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employee.qualifications.map((qualification) => (
                  <tr key={qualification.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{qualification.course}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{qualification.yearPassed}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            qualification.marksPercentage >= 70
                              ? 'bg-success-50 text-success-700'
                              : qualification.marksPercentage >= 50
                              ? 'bg-warning-50 text-warning-700'
                              : 'bg-error-50 text-error-700'
                          }`}
                        >
                          {qualification.marksPercentage}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default QualificationsModal;