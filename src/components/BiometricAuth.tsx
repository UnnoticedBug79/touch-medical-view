
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Fingerprint } from 'lucide-react';

interface BiometricAuthProps {
  onSuccess: () => void;
  userType: 'patient' | 'staff';
  title: string;
}

const BiometricAuth = ({ onSuccess, userType, title }: BiometricAuthProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    
    // Simulate biometric scanning process
    setTimeout(() => {
      setScanComplete(true);
      setTimeout(() => {
        setIsScanning(false);
        setScanComplete(false);
        onSuccess();
      }, 1000);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-lg font-medium text-gray-700 mb-6">{title}</p>
        
        <div className="relative inline-block">
          <Card className={`w-48 h-48 mx-auto transition-all duration-300 ${
            isScanning 
              ? 'bg-gradient-to-r from-blue-400 to-green-400 shadow-2xl scale-105' 
              : scanComplete 
                ? 'bg-gradient-to-r from-green-400 to-green-500 shadow-2xl scale-105'
                : 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-50 hover:to-green-50 hover:shadow-lg cursor-pointer'
          }`}>
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <Fingerprint 
                  className={`w-16 h-16 mx-auto mb-3 transition-all duration-300 ${
                    isScanning 
                      ? 'text-white animate-pulse' 
                      : scanComplete 
                        ? 'text-white'
                        : 'text-gray-400'
                  }`} 
                />
                <p className={`text-sm font-medium ${
                  isScanning || scanComplete ? 'text-white' : 'text-gray-600'
                }`}>
                  {isScanning 
                    ? 'Scanning...' 
                    : scanComplete 
                      ? 'Verified!' 
                      : 'Touch to Scan'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
          
          {isScanning && (
            <div className="absolute inset-0 rounded-lg border-4 border-blue-400 animate-pulse"></div>
          )}
        </div>
      </div>

      <div className="text-center">
        <Button
          onClick={handleScan}
          disabled={isScanning || scanComplete}
          className={`px-8 py-3 text-lg font-medium rounded-full transition-all duration-300 ${
            userType === 'patient' 
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' 
              : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
          } text-white shadow-lg hover:shadow-xl transform hover:scale-105`}
        >
          {isScanning ? 'Authenticating...' : scanComplete ? 'Access Granted' : 'Start Biometric Scan'}
        </Button>
        
        <p className="text-sm text-gray-500 mt-4">
          Place your finger on the scanner or look into the camera for eye recognition
        </p>
      </div>
    </div>
  );
};

export default BiometricAuth;
