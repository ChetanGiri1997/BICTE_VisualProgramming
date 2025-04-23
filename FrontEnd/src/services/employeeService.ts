import api from './api';

export interface Qualification {
  id?: number | null;
  employeeId?: number;
  course: string;
  yearPassed: number;
  marksPercentage: number;
}

export interface Employee {
  id?: number;
  userId?: number;
  name: string;
  dob: string;
  address: string;
  contact: string;
  qualifications: Qualification[];
}

export const employeeService = {
  // Get all employees
  getEmployees: async () => {
    const response = await api.get('/employee');
    return response.data;
  },

  // Get employee by ID
  getEmployee: async (id: number) => {
    const response = await api.get(`/employee/${id}`);
    return response.data;
  },

  // Create new employee
  createEmployee: async (employee: Employee) => {
    const response = await api.post('/employee', employee);
    return response.data;
  },

  // Update existing employee
  updateEmployee: async (id: number, employee: Employee) => {
    const response = await api.put(`/employee/${id}`, employee);
    return response.data;
  },

  // Delete employee
  deleteEmployee: async (id: number) => {
    const response = await api.delete(`/employee/${id}`);
    return response.data;
  }
};