import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';


const RegistrationForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
    academicLevel: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const userTypeOptions = [
    { value: 'student', label: 'Student', description: 'Access study tools and resources' },
    { value: 'educator', label: 'Educator', description: 'Create and manage educational content' },
    { value: 'professional', label: 'Professional', description: 'Continuing education and certification' }
  ];

  const academicLevelOptions = [
    { value: 'high-school', label: 'High School' },
    { value: 'undergraduate', label: 'Undergraduate' },
    { value: 'graduate', label: 'Graduate' },
    { value: 'professional', label: 'Professional Development' }
  ];

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 25;
    if (/[A-Z]/?.test(password)) strength += 25;
    if (/[0-9]/?.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/?.test(password)) strength += 25;
    return strength;
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 50) return 'bg-error';
    if (passwordStrength < 75) return 'bg-warning';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Very Weak';
    if (passwordStrength < 50) return 'Weak';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData?.fullName?.trim()) {
        newErrors.fullName = 'Full name is required';
      }
      if (!formData?.email?.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (step === 2) {
      if (!formData?.password) {
        newErrors.password = 'Password is required';
      } else if (formData?.password?.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (!formData?.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (step === 3) {
      if (!formData?.userType) {
        newErrors.userType = 'Please select your user type';
      }
      if (!formData?.academicLevel) {
        newErrors.academicLevel = 'Please select your academic level';
      }
      if (!formData?.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms and conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'password') {
      let strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }

    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateStep(3)) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Mock successful registration
      navigate('/dashboard');
    }, 2000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                Personal Information
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                Let's start with your basic details
              </p>
            </div>
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              value={formData?.fullName}
              onChange={(e) => handleInputChange('fullName', e?.target?.value)}
              error={errors?.fullName}
              required
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email address"
              value={formData?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              error={errors?.email}
              description="We'll use this to send you important updates"
              required
            />
            <Button
              variant="default"
              fullWidth
              onClick={handleNextStep}
              iconName="ArrowRight"
              iconPosition="right"
              className="mt-6"
            >
              Continue
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                Secure Your Account
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                Create a strong password to protect your account
              </p>
            </div>
            <div>
              <Input
                label="Password"
                type="password"
                placeholder="Create a strong password"
                value={formData?.password}
                onChange={(e) => handleInputChange('password', e?.target?.value)}
                error={errors?.password}
                required
              />
              
              {formData?.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-body text-xs text-muted-foreground">
                      Password Strength
                    </span>
                    <span className={`font-body text-xs font-medium ${
                      passwordStrength < 50 ? 'text-error' : 
                      passwordStrength < 75 ? 'text-warning' : 'text-success'
                    }`}>
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                      style={{ width: `${passwordStrength}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              value={formData?.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
              error={errors?.confirmPassword}
              required
            />
            <div className="flex space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={handlePrevStep}
                iconName="ArrowLeft"
                iconPosition="left"
                className="flex-1"
              >
                Back
              </Button>
              <Button
                variant="default"
                onClick={handleNextStep}
                iconName="ArrowRight"
                iconPosition="right"
                className="flex-1"
              >
                Continue
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                Personalize Your Experience
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                Help us customize the platform for your needs
              </p>
            </div>
            <Select
              label="I am a..."
              placeholder="Select your role"
              options={userTypeOptions}
              value={formData?.userType}
              onChange={(value) => handleInputChange('userType', value)}
              error={errors?.userType}
              required
            />
            <Select
              label="Academic Level"
              placeholder="Select your current level"
              options={academicLevelOptions}
              value={formData?.academicLevel}
              onChange={(value) => handleInputChange('academicLevel', value)}
              error={errors?.academicLevel}
              required
            />
            <div className="pt-4">
              <Checkbox
                label="I agree to the Terms of Service and Privacy Policy"
                checked={formData?.agreeToTerms}
                onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
                error={errors?.agreeToTerms}
                required
              />
            </div>
            <div className="flex space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={handlePrevStep}
                iconName="ArrowLeft"
                iconPosition="left"
                className="flex-1"
              >
                Back
              </Button>
              <Button
                variant="default"
                onClick={handleSubmit}
                loading={isLoading}
                iconName="UserPlus"
                iconPosition="right"
                className="flex-1"
              >
                Create Account
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {renderStepContent()}
      </form>
    </div>
  );
};

export default RegistrationForm;