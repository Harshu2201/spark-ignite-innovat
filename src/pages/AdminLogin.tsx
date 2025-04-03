
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft, Key, Lock, Eye, EyeOff } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// For demo purposes only - in a real application, this would be securely stored in a database
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'innovatexpo2025'
};

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate server delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check credentials (in a real app, this would be a secure API call)
      if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Set admin session
        localStorage.setItem('adminAuthenticated', 'true');
        
        toast.success('Login successful!', {
          description: 'Welcome to the admin dashboard'
        });
        
        navigate('/admin/dashboard');
      } else {
        toast.error('Login failed', {
          description: 'Invalid username or password'
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Something went wrong', {
        description: 'Please try again later'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col min-h-screen bg-expo-bg">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16 px-4 relative">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-radial from-expo-purple/5 via-transparent to-transparent opacity-40 z-0"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-expo-cyan/5 rounded-full filter blur-3xl z-0"></div>
        
        <div className="w-full max-w-md relative z-10">
          <Link to="/" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Back to Home</span>
          </Link>
          
          <div className="bg-expo-darkBlue/60 backdrop-blur-sm rounded-xl border border-expo-cyan/20 p-8 shadow-lg animate-fade-in">
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-expo-purple to-expo-cyan p-3 rounded-full">
              <Lock className="w-6 h-6 text-white" />
            </div>
            
            <div className="text-center mb-8 pt-4">
              <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
              <p className="text-white/60 text-sm">Access the InnovatExpo dashboard</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="relative group">
                  <div className="flex items-center space-x-2 mb-2">
                    <Key className="w-4 h-4 text-expo-cyan" />
                    <label htmlFor="username" className="text-white font-medium">Username</label>
                  </div>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border-expo-cyan/30 bg-expo-darkBlue/60 text-white focus:border-expo-cyan"
                    placeholder="Enter your username"
                    required
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-expo-cyan to-expo-purple group-focus-within:w-full transition-all duration-300"></div>
                </div>
                
                <div className="relative group">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lock className="w-4 h-4 text-expo-cyan" />
                    <label htmlFor="password" className="text-white font-medium">Password</label>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-expo-cyan/30 bg-expo-darkBlue/60 text-white focus:border-expo-cyan pr-10"
                      placeholder="Enter your password"
                      required
                    />
                    <button 
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-expo-cyan to-expo-purple group-focus-within:w-full transition-all duration-300"></div>
                </div>
              </div>
              
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-expo-cyan to-expo-purple hover:shadow-lg hover:shadow-expo-cyan/20 text-white py-5 relative overflow-hidden group"
              >
                <span className="relative z-10">
                  {isLoading ? 'Logging in...' : 'Login'}
                </span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              </Button>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminLogin;
