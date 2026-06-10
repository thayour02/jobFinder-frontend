import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { apiRequest } from '../../utils/store';
import { Login } from '../../redux/slice';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { LoadingSpinner } from '../../components/ui/Loading';
import { Badge } from '../../components/ui/Badge';
import { 
  User, 
  Briefcase, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  ArrowRight,
  CheckCircle,
  Shield,
  Users
} from 'lucide-react';

const AuthModern = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [accountType, setAccountType] = useState('Seeker');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    LastName: '',
    name: '',
    location: '',
    contact: ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Endpoints differ by account type — see backend routes:
      //   Seeker -> /api/user (authRoutes),  Company -> /api (companyRoutes)
      const endpoint = isLogin
        ? accountType === 'Seeker' ? '/user/login' : '/login'
        : accountType === 'Seeker' ? '/user/signup' : '/reg';

      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : accountType === 'Seeker'
          ? {
              firstName: formData.firstName,
              LastName: formData.LastName,
              email: formData.email,
              password: formData.password
            }
          : {
              name: formData.name,
              email: formData.email,
              password: formData.password,
              location: formData.location,
              contact: formData.contact
            };

      const response = await apiRequest({
        url: endpoint,
        method: 'POST',
        data: payload
      });

      if (!response.success) {
        toast.error(response.message || 'Something went wrong');
        return;
      }

      toast.success(response.message || 'Success');

      if (isLogin) {
        // Backend returns the token as a sibling of `user` — merge them so
        // redux/localStorage carry `user.token` (what the route guard checks).
        const userData = { token: response.token, ...response.user };
        dispatch(Login(userData));
        localStorage.setItem('userInfo', JSON.stringify(userData));
        navigate('/');
      } else {
        // After registering, drop back to the sign-in form.
        setIsLogin(true);
        setFormData({
          email: '',
          password: '',
          firstName: '',
          LastName: '',
          name: '',
          location: '',
          contact: ''
        });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: <Shield className="w-5 h-5" />, text: "Secure Authentication" },
    { icon: <Users className="w-5 h-5" />, text: "10,000+ Companies" },
    { icon: <Briefcase className="w-5 h-5" />, text: "50,000+ Jobs" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Side - Form */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </CardTitle>
              <p className="text-gray-600">
                {isLogin 
                  ? 'Sign in to your account to continue'
                  : 'Join thousands of professionals finding their dream jobs'
                }
              </p>
            </CardHeader>
            
            <CardContent>
              {/* Account Type Toggle */}
              {!isLogin && (
                <div className="flex space-x-2 mb-6">
                  <Button
                    variant={accountType === 'Seeker' ? 'default' : 'outline'}
                    onClick={() => setAccountType('Seeker')}
                    className="flex-1"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Job Seeker
                  </Button>
                  <Button
                    variant={accountType === 'Company' ? 'default' : 'outline'}
                    onClick={() => setAccountType('Company')}
                    className="flex-1"
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    Company
                  </Button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Registration Fields */}
                {!isLogin && accountType === 'Seeker' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <Input
                          name="firstName"
                          type="text"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <Input
                          name="LastName"
                          type="text"
                          placeholder="Doe"
                          value={formData.LastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {!isLogin && accountType === 'Company' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name
                      </label>
                      <Input
                        name="name"
                        type="text"
                        placeholder="Acme Inc."
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <Input
                          name="location"
                          type="text"
                          placeholder="New York, NY"
                          value={formData.location}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contact
                        </label>
                        <Input
                          name="contact"
                          type="text"
                          placeholder="+1234567890"
                          value={formData.contact}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Common Fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      {isLogin ? 'Signing In...' : 'Creating Account...'}
                    </>
                  ) : (
                    <>
                      {isLogin ? 'Sign In' : 'Create Account'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              {/* Toggle Login/Register */}
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="ml-1 text-purple-600 hover:text-purple-700 font-medium"
                  >
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Marketing */}
        <div className="flex items-center justify-center">
          <div className="text-center space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Find Your Dream Job
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Join the leading job platform connecting talented professionals with top companies
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                    {feature.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">
                      {feature.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Why Choose Job Portal?
              </h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">Verified Companies</div>
                    <div className="text-sm text-gray-600">All companies are verified for authenticity</div>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">Smart Matching</div>
                    <div className="text-sm text-gray-600">AI-powered job recommendations</div>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">Easy Applications</div>
                    <div className="text-sm text-gray-600">Apply to multiple jobs in minutes</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Badge variant="outline">10,000+</Badge>
                <span>Jobs</span>
              </div>
              <div className="flex items-center space-x-1">
                <Badge variant="outline">5,000+</Badge>
                <span>Companies</span>
              </div>
              <div className="flex items-center space-x-1">
                <Badge variant="outline">50,000+</Badge>
                <span>Users</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModern;
