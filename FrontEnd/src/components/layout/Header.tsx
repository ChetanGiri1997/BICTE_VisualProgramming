import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Briefcase, Menu, X, LogOut, Users } from 'lucide-react';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Briefcase className="h-8 w-8 text-primary-600 mr-2" />
              <span className="font-bold text-lg text-gray-900">EMS</span>
            </Link>
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              <Link
                to="/employees"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-primary-600 border-b-2 border-transparent hover:border-primary-500 transition-colors"
              >
                <Users className="h-4 w-4 mr-1" />
                Employees
              </Link>
            </nav>
          </div>

          <div className="hidden md:flex md:items-center">
            <Button
              variant="outline"
              onClick={handleLogout}
              className="inline-flex items-center"
            >
              <LogOut className="h-4 w-4 mr-1" />
              Sign Out
            </Button>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 animate-fadeIn">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/employees"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Employees
              </div>
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <LogOut className="h-5 w-5 mr-2" />
                Sign Out
              </div>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;