
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { LogOut, Search, Download, Trash2, RefreshCw, Users, Calendar, MapPin, School } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Type for registration data
interface Registration {
  id: number;
  teamName: string;
  leaderName: string;
  email: string;
  phone: string;
  college: string;
  city: string;
  year: string;
  branch: string;
  teamMembers?: string;
  projectIdea: string;
  date: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if admin is authenticated
  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
      if (!isAuthenticated) {
        toast.error('Access denied', {
          description: 'Please login to access the admin dashboard'
        });
        navigate('/admin/login');
      } else {
        // Load registrations from localStorage
        loadRegistrations();
      }
    };
    
    checkAuth();
  }, [navigate]);
  
  const loadRegistrations = () => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      const data = JSON.parse(localStorage.getItem('registrations') || '[]');
      setRegistrations(data);
      
      // Show success toast only if there are registrations
      if (data.length > 0) {
        toast.success('Data loaded successfully', {
          description: `${data.length} team registrations found`
        });
      }
    } catch (error) {
      console.error('Error loading registrations:', error);
      toast.error('Failed to load data', {
        description: 'Please try refreshing the page'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };
  
  const handleExportCSV = () => {
    if (registrations.length === 0) {
      toast.error('No data to export');
      return;
    }
    
    try {
      // Create CSV header
      const headers = [
        'ID', 'Team Name', 'Leader Name', 'Email', 'Phone', 
        'College', 'City', 'Year', 'Branch', 'Team Members', 
        'Project Idea', 'Registration Date'
      ];
      
      // Convert registrations to CSV rows
      const rows = registrations.map(reg => [
        reg.id,
        reg.teamName,
        reg.leaderName,
        reg.email,
        reg.phone,
        reg.college,
        reg.city,
        reg.year,
        reg.branch,
        reg.teamMembers || '',
        reg.projectIdea,
        new Date(reg.date).toLocaleString()
      ]);
      
      // Combine headers and rows
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      ].join('\n');
      
      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `innovatexpo-registrations-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Export successful', {
        description: 'Registrations exported to CSV'
      });
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Export failed', {
        description: 'Please try again later'
      });
    }
  };
  
  const handleDeleteAll = () => {
    if (window.confirm('Are you sure you want to delete all registrations? This action cannot be undone.')) {
      localStorage.setItem('registrations', '[]');
      setRegistrations([]);
      toast.success('All registrations deleted');
    }
  };
  
  // Filter registrations based on search term
  const filteredRegistrations = registrations.filter(reg => 
    reg.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.leaderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.college.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="flex flex-col min-h-screen bg-expo-bg">
      <Navbar />
      
      <main className="flex-grow py-12 px-4 md:px-8 relative">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-radial from-expo-purple/5 via-transparent to-transparent opacity-40 z-0"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gradient mb-2">Admin Dashboard</h1>
              <p className="text-white/70">Manage team registrations for InnovatExpo</p>
            </div>
            
            <Button 
              onClick={handleLogout} 
              variant="outline"
              className="border-expo-cyan/30 text-white hover:bg-expo-cyan/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
          
          <div className="bg-expo-darkBlue/60 backdrop-blur-sm rounded-xl border border-expo-cyan/20 p-6 shadow-lg mb-8 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-expo-darkBlue/80 rounded-lg p-4 border border-expo-cyan/10 flex items-center">
                <div className="bg-expo-cyan/10 rounded-full p-3 mr-4">
                  <Users className="w-6 h-6 text-expo-cyan" />
                </div>
                <div>
                  <h3 className="text-white/80 text-sm">Total Teams</h3>
                  <p className="text-white text-xl font-bold">{registrations.length}</p>
                </div>
              </div>
              
              <div className="bg-expo-darkBlue/80 rounded-lg p-4 border border-expo-cyan/10 flex items-center">
                <div className="bg-expo-purple/10 rounded-full p-3 mr-4">
                  <School className="w-6 h-6 text-expo-purple" />
                </div>
                <div>
                  <h3 className="text-white/80 text-sm">Unique Colleges</h3>
                  <p className="text-white text-xl font-bold">
                    {new Set(registrations.map(r => r.college)).size}
                  </p>
                </div>
              </div>
              
              <div className="bg-expo-darkBlue/80 rounded-lg p-4 border border-expo-cyan/10 flex items-center">
                <div className="bg-expo-cyan/10 rounded-full p-3 mr-4">
                  <MapPin className="w-6 h-6 text-expo-cyan" />
                </div>
                <div>
                  <h3 className="text-white/80 text-sm">Unique Cities</h3>
                  <p className="text-white text-xl font-bold">
                    {new Set(registrations.map(r => r.city)).size}
                  </p>
                </div>
              </div>
              
              <div className="bg-expo-darkBlue/80 rounded-lg p-4 border border-expo-cyan/10 flex items-center">
                <div className="bg-expo-purple/10 rounded-full p-3 mr-4">
                  <Calendar className="w-6 h-6 text-expo-purple" />
                </div>
                <div>
                  <h3 className="text-white/80 text-sm">Last Registration</h3>
                  <p className="text-white text-sm font-medium">
                    {registrations.length > 0 
                      ? new Date(Math.max(...registrations.map(r => new Date(r.date).getTime()))).toLocaleDateString() 
                      : 'N/A'
                    }
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                <Input
                  placeholder="Search teams..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-expo-cyan/30 bg-expo-darkBlue/80 text-white focus:border-expo-cyan"
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={loadRegistrations}
                  variant="outline"
                  className="border-expo-cyan/30 text-white hover:bg-expo-cyan/10"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
                
                <Button 
                  onClick={handleExportCSV}
                  className="bg-expo-cyan text-expo-darkBlue hover:bg-expo-cyan/90"
                  disabled={registrations.length === 0}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
                
                <Button 
                  onClick={handleDeleteAll}
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-600 text-white"
                  disabled={registrations.length === 0}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete All
                </Button>
              </div>
            </div>
            
            <div className="rounded-lg border border-expo-cyan/10 overflow-hidden">
              {isLoading ? (
                <div className="flex items-center justify-center p-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-expo-cyan"></div>
                </div>
              ) : registrations.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-center">
                  <Users className="w-12 h-12 text-white/20 mb-4" />
                  <h3 className="text-white font-medium text-lg mb-2">No Registrations Yet</h3>
                  <p className="text-white/60 max-w-md">
                    There are no team registrations yet. As teams register, they will appear here.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-expo-darkBlue/80">
                      <TableRow className="hover:bg-expo-darkBlue/60 border-expo-cyan/10">
                        <TableHead className="text-white w-[80px]">ID</TableHead>
                        <TableHead className="text-white">Team Name</TableHead>
                        <TableHead className="text-white">Leader</TableHead>
                        <TableHead className="text-white">College</TableHead>
                        <TableHead className="text-white">Branch</TableHead>
                        <TableHead className="text-white">City</TableHead>
                        <TableHead className="text-white">Date</TableHead>
                        <TableHead className="text-white w-[100px]">View</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRegistrations.map((registration) => (
                        <TableRow key={registration.id} className="hover:bg-expo-darkBlue border-expo-cyan/10">
                          <TableCell className="text-white/70 font-mono">#{registration.id}</TableCell>
                          <TableCell className="text-white font-medium">{registration.teamName}</TableCell>
                          <TableCell className="text-white/70">{registration.leaderName}</TableCell>
                          <TableCell className="text-white/70">{registration.college}</TableCell>
                          <TableCell className="text-white/70">{registration.branch}</TableCell>
                          <TableCell className="text-white/70">{registration.city}</TableCell>
                          <TableCell className="text-white/70">{formatDate(registration.date)}</TableCell>
                          <TableCell>
                            <Button 
                              onClick={() => {
                                alert(`
Team: ${registration.teamName}
Leader: ${registration.leaderName}
Email: ${registration.email}
Phone: ${registration.phone}
College: ${registration.college}
City: ${registration.city}
Year: ${registration.year}
Branch: ${registration.branch}
Team Members: ${registration.teamMembers || 'None'}
Project Idea: ${registration.projectIdea}
Registered: ${formatDate(registration.date)}
                                `);
                              }}
                              variant="outline"
                              size="sm"
                              className="border-expo-cyan/30 text-white hover:bg-expo-cyan/10"
                            >
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
