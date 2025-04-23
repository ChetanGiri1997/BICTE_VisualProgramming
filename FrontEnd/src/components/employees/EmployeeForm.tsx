import React, { useState } from 'react';
import { Employee, Qualification } from '../../services/employeeService';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { PlusCircle, Trash2, Save } from 'lucide-react';
import { format } from 'date-fns';

interface EmployeeFormProps {
  initialData: Employee;
  onSubmit: (data: Employee) => void;
  isSubmitting: boolean;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting,
}) => {
  const [formData, setFormData] = useState<Employee>({
    ...initialData,
    dob: initialData.dob ? format(new Date(initialData.dob), 'yyyy-MM-dd') : '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Validate employee fields
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact information is required';
    }
    
    // Validate each qualification
    formData.qualifications.forEach((qual, index) => {
      if (!qual.course.trim()) {
        newErrors[`qualification_${index}_course`] = 'Course name is required';
      }
      
      if (!qual.yearPassed) {
        newErrors[`qualification_${index}_yearPassed`] = 'Year passed is required';
      } else if (qual.yearPassed < 1900 || qual.yearPassed > new Date().getFullYear()) {
        newErrors[`qualification_${index}_yearPassed`] = 'Year must be valid';
      }
      
      if (qual.marksPercentage < 0 || qual.marksPercentage > 100) {
        newErrors[`qualification_${index}_marksPercentage`] = 'Marks must be between 0 and 100';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleQualificationChange = (index: number, field: keyof Qualification, value: string | number) => {
    const updatedQualifications = [...formData.qualifications];
    updatedQualifications[index] = {
      ...updatedQualifications[index],
      [field]: field === 'course' ? value : Number(value),
    };
    
    setFormData((prev) => ({
      ...prev,
      qualifications: updatedQualifications,
    }));
    
    // Clear error when field is updated
    const errorKey = `qualification_${index}_${field}`;
    if (errors[errorKey]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }
  };

  const addQualification = () => {
    setFormData((prev) => ({
      ...prev,
      qualifications: [
        ...prev.qualifications,
        { id: null, course: '', yearPassed: new Date().getFullYear(), marksPercentage: 0 },
      ],
    }));
  };

  const removeQualification = (index: number) => {
    const updatedQualifications = [...formData.qualifications];
    updatedQualifications.splice(index, 1);
    
    setFormData((prev) => ({
      ...prev,
      qualifications: updatedQualifications,
    }));
    
    // Remove any errors related to this qualification
    setErrors((prev) => {
      const newErrors = { ...prev };
      Object.keys(newErrors).forEach((key) => {
        if (key.startsWith(`qualification_${index}_`)) {
          delete newErrors[key];
        }
      });
      return newErrors;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />
        </div>
        
        <div>
          <Input
            label="Date of Birth"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            error={errors.dob}
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <Input
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <Input
            label="Contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            error={errors.contact}
            required
          />
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-800">Qualifications</h3>
          <Button
            type="button"
            variant="outline"
            onClick={addQualification}
            className="flex items-center"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Add Qualification
          </Button>
        </div>
        
        {formData.qualifications.length === 0 ? (
          <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500">No qualifications added yet</p>
            <Button
              type="button"
              variant="ghost"
              onClick={addQualification}
              className="mt-2"
            >
              <PlusCircle className="h-4 w-4 mr-1" />
              Add Qualification
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {formData.qualifications.map((qualification, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 animate-slideIn"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-medium text-gray-700">Qualification #{index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeQualification(index)}
                    className="text-error-600 hover:text-error-800 -mt-1 -mr-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Input
                      label="Course"
                      value={qualification.course}
                      onChange={(e) => handleQualificationChange(index, 'course', e.target.value)}
                      error={errors[`qualification_${index}_course`]}
                      required
                    />
                  </div>
                  
                  <div>
                    <Input
                      label="Year Passed"
                      type="number"
                      value={qualification.yearPassed.toString()}
                      onChange={(e) => handleQualificationChange(index, 'yearPassed', e.target.value)}
                      error={errors[`qualification_${index}_yearPassed`]}
                      min="1900"
                      max={new Date().getFullYear().toString()}
                      required
                    />
                  </div>
                  
                  <div>
                    <Input
                      label="Marks (%)"
                      type="number"
                      value={qualification.marksPercentage.toString()}
                      onChange={(e) =>
                        handleQualificationChange(index, 'marksPercentage', e.target.value)
                      }
                      error={errors[`qualification_${index}_marksPercentage`]}
                      min="0"
                      max="100"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="pt-4 flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
          className="flex items-center"
        >
          <Save className="h-4 w-4 mr-1" />
          {initialData.id ? 'Update Employee' : 'Create Employee'}
        </Button>
      </div>
    </form>
  );
};

export default EmployeeForm;