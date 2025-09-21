import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for authentication
  const mockCredentials = {
    username: 'admin@school.edu',
    password: 'Admin123!'
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.username?.trim()) {
      newErrors.username = 'Username is required';
    } else if (!formData?.username?.includes('@')) {
      newErrors.username = 'Please enter a valid email address';
    }
    
    if (!formData?.password?.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      if (
        formData?.username === mockCredentials?.username &&
        formData?.password === mockCredentials?.password
      ) {
        // Store authentication state
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData?.username);
        if (formData?.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        
        // Navigate to dashboard
        navigate('/administrative-dashboard');
      } else {
        setErrors({
          general: 'Invalid credentials. Please use admin@school.edu / Admin123!'
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleForgotPassword = () => {
    alert('Password reset functionality will be implemented in future updates.');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 neon-hover">
            <Icon name="Shield" size={32} color="white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground text-glow mb-2">
            Administrator Login
          </h2>
          <p className="text-muted-foreground">
            Access your attendance management dashboard
          </p>
        </div>

        {/* General Error */}
        {errors?.general && (
          <div className="glass border border-error/30 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <Icon name="AlertCircle" size={20} className="text-error flex-shrink-0" />
              <p className="text-error text-sm font-medium">{errors?.general}</p>
            </div>
          </div>
        )}

        {/* Username Field */}
        <div className="space-y-2">
          <Input
            label="Username / Email"
            type="email"
            name="username"
            placeholder="Enter your email address"
            value={formData?.username}
            onChange={handleInputChange}
            error={errors?.username}
            required
            className="lightning-transition neon-focus"
          />
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              value={formData?.password}
              onChange={handleInputChange}
              error={errors?.password}
              required
              className="lightning-transition neon-focus pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground lightning-transition neon-hover"
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            name="rememberMe"
            checked={formData?.rememberMe}
            onChange={handleInputChange}
            className="text-sm"
          />
          
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:text-accent lightning-transition text-glow-accent"
          >
            Forgot password?
          </button>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          loading={isLoading}
          disabled={isLoading}
          className="w-full neon-hover"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>

        {/* Demo Credentials Info */}
        <div className="glass border border-accent/20 rounded-lg p-4 mt-6">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-accent flex-shrink-0 mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <p className="font-medium text-accent mb-1">Demo Credentials:</p>
              <p>Email: admin@school.edu</p>
              <p>Password: Admin123!</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;