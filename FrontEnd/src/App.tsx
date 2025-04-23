import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import EmployeeListPage from './pages/EmployeeListPage';
import EmployeeFormPage from './pages/EmployeeFormPage';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import { Toaster } from './components/ui/Toaster';

const App = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/employees" /> : <LoginPage />
        } />
        
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/employees" />} />
          <Route path="employees" element={<EmployeeListPage />} />
          <Route path="employees/create" element={<EmployeeFormPage />} />
          <Route path="employees/edit/:id" element={<EmployeeFormPage />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;