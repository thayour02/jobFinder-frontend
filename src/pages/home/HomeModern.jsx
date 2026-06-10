import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { 
  Search, 
  Briefcase, 
  Users, 
  Building, 
  MapPin, 
  TrendingUp,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-purple-600 to-purple-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Dream Job Today
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
            Connect with leading companies and skilled professionals. Your next career opportunity awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
              <Search className="w-5 h-5 mr-2" />
              Find Jobs
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
              <Building className="w-5 h-5 mr-2" />
              Post a Job
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Smart Search",
      description: "Advanced filtering and search capabilities to find the perfect match"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Verified Profiles",
      description: "All companies and profiles are verified for authenticity"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Quick Apply",
      description: "Apply to multiple jobs with just a few clicks"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Career Growth",
      description: "Track your applications and career progress"
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Job Portal?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We provide the tools and features you need to succeed in your job search
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatsSection = () => {
  const stats = [
    { number: "10,000+", label: "Active Jobs" },
    { number: "5,000+", label: "Companies" },
    { number: "50,000+", label: "Job Seekers" },
    { number: "95%", label: "Success Rate" }
  ];

  return (
    <div className="py-20 bg-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-purple-100">
            Join our growing community of professionals and companies
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {stat.number}
              </div>
              <div className="text-purple-100">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Create Profile",
      description: "Sign up and create your professional profile",
      icon: <Users className="w-8 h-8" />
    },
    {
      number: "2", 
      title: "Search & Apply",
      description: "Find jobs that match your skills and apply instantly",
      icon: <Search className="w-8 h-8" />
    },
    {
      number: "3",
      title: "Get Hired",
      description: "Connect with employers and land your dream job",
      icon: <Briefcase className="w-8 h-8" />
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started in three simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto text-purple-600">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
              
              {/* Arrow connector */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-8 transform -translate-y-1/2">
                  <ArrowRight className="w-8 h-8 text-purple-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CTASection = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Ready to Find Your Dream Job?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of professionals who have already found their perfect match
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild >
            <Link to="/find-jobs" className='flex items-center '>
              <Search className="w-5 h-5 mr-2" />
              Start Searching
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/auth" className='flex items-center'>
              <Users className="w-5 h-5 mr-2" />
              Create Account
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <HowItWorks />
      <CTASection />
    </div>
  );
}
