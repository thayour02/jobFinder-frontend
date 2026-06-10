import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LogOut } from '../redux/slice';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { 
  Menu, 
  X, 
  User, 
  Briefcase, 
  Building, 
  Info, 
  LogOut as LogOutIcon,
  ChevronDown,
  Search
} from 'lucide-react';
import { GlobalContext } from '../context';
import img from '../assets/tayo.webp';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogOut = () => {
    dispatch(LogOut());
    window.location.replace('/');
  };

  const navLinks = [
    { href: '/find-jobs', label: 'Jobs', icon: <Briefcase className="w-4 h-4" /> },
    { href: '/company', label: 'Companies', icon: <Building className="w-4 h-4" /> },
    { href: '/about-us', label: 'About', icon: <Info className="w-4 h-4" /> },
  ];

  const isActiveLink = (href) => {
    return location.pathname === href;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src={img} 
                alt="Job Portal" 
                className="h-8 w-8 rounded-lg"
              />
              <span className="text-xl font-bold text-gray-900">
                Job <span className="text-purple-600">Portal</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActiveLink(link.href)
                    ? 'text-purple-600 bg-purple-50'
                    : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
            
            {/* Action Button */}
            {user?.token ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2"
                >
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    {user?.profileUrl ? (
                      <img
                        src={user.profileUrl}
                        alt={user.firstName || user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-4 h-4 text-purple-600" />
                    )}
                  </div>
                  <span className="text-sm font-medium">
                    {user?.firstName || user?.name || 'User'}
                  </span>
                  {user?.isVerified && (
                    <Badge variant="success" className="text-xs px-1 py-0">
                      ✓
                    </Badge>
                  )}
                  <ChevronDown className="w-4 h-4" />
                </Button>

                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to={user?.accountType === "Seeker" ? "/user-profile" : "/company-profile"}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                    <button
                      onClick={handleLogOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                    >
                      <LogOutIcon className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="inline-flex items-center justify-center rounded-md bg-purple-600 text-white hover:bg-purple-700 h-10 px-4 py-2 text-sm font-medium transition-colors"
              >
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                  isActiveLink(link.href)
                    ? 'text-purple-600 bg-purple-50'
                    : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
            
            {user?.token ? (
              <>
                <Link
                  to={user?.accountType === "Seeker" ? "/user-profile" : "/company-profile"}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogOut}
                  className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                >
                  <LogOutIcon className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-md bg-purple-600 text-white hover:bg-purple-700 h-10 px-4 py-2 text-sm font-medium transition-colors"
              >
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
