
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Fingerprint, Hospital, User, UserRound } from 'lucide-react';
import BiometricAuth from '../components/BiometricAuth';
import PatientDashboard from '../components/PatientDashboard';
import StaffPortal from '../components/StaffPortal';
import Header from '../components/Header';

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'patient' | 'staff'>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'patient' | 'staff' | null>(null);

  const handleBiometricSuccess = (type: 'patient' | 'staff') => {
    setIsAuthenticated(true);
    setUserType(type);
    setCurrentView(type);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType(null);
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header onLogout={handleLogout} isAuthenticated={isAuthenticated} userType={userType} />
      
      <main className="container mx-auto px-4 py-8">
        {currentView === 'home' && (
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16 animate-fade-in">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-6 shadow-lg">
                <Hospital className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-gray-800 mb-4 leading-tight">
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">MediCare Portal</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Experience seamless healthcare access with our advanced biometric authentication system. 
                Your medical data, instantly available when you need it most.
              </p>
            </div>

            {/* Quick Access Cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800">Patient Access</CardTitle>
                  <CardDescription className="text-base text-gray-600">
                    Quick and secure access to your medical records
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <BiometricAuth 
                    onSuccess={() => handleBiometricSuccess('patient')}
                    userType="patient"
                    title="Scan to Access Your Records"
                  />
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <UserRound className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800">Staff Portal</CardTitle>
                  <CardDescription className="text-base text-gray-600">
                    Secure staff access to patient management system
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <BiometricAuth 
                    onSuccess={() => handleBiometricSuccess('staff')}
                    userType="staff"
                    title="Staff Authentication"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Features Section */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border-0">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Why Choose MediCare Portal?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Fingerprint className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Biometric Security</h3>
                  <p className="text-gray-600">Advanced fingerprint and eye recognition for instant, secure access</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Hospital className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Instant Access</h3>
                  <p className="text-gray-600">No forms to fill out - your medical data loads automatically</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <User className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Patient-Centered</h3>
                  <p className="text-gray-600">Designed for ease of use, especially during stressful situations</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'patient' && isAuthenticated && (
          <PatientDashboard onBack={() => setCurrentView('home')} />
        )}

        {currentView === 'staff' && isAuthenticated && (
          <StaffPortal onBack={() => setCurrentView('home')} />
        )}
      </main>
    </div>
  );
};

export default Index;
