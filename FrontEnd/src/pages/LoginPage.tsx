import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRound, Lock, Briefcase } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Form validation
    if (!username.trim()) {
      setFormError('Username is required');
      return;
    }
    if (!password) {
      setFormError('Password is required');
      return;
    }

    setFormError('');
    try {
      await login(username, password);
      navigate('/employees');
    } catch (err) {
      // Error is already handled in the AuthContext
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-700 to-accent-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full animate-fadeIn">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
            <Briefcase className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Employee Management System</h1>
          <p className="text-gray-500 mt-2">Sign in to access your dashboard</p>
        </div>

        {(error || formError) && (
          <div className="mb-6 p-3 bg-error-50 border border-error-500 text-error-700 rounded-md text-sm">
            {error || formError}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <Input
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              icon={<UserRound className="h-5 w-5 text-gray-400" />}
              disabled={loading}
            />
          </div>

          <div>
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              icon={<Lock className="h-5 w-5 text-gray-400" />}
              disabled={loading}
            />
          </div>

          <Button
            onClick={handleLogin}
            loading={loading}
            fullWidth
            className="mt-2"
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;