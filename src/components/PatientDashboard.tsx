
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Hospital } from 'lucide-react';

interface PatientDashboardProps {
  onBack: () => void;
}

const PatientDashboard = ({ onBack }: PatientDashboardProps) => {
  // Mock patient data - in a real app, this would come from the biometric authentication
  const patientData = {
    name: "Sarah Johnson",
    id: "P-2024-001234",
    dateOfBirth: "March 15, 1985",
    address: "123 Oak Street, Springfield, IL 62701",
    phone: "(555) 123-4567",
    email: "sarah.johnson@email.com",
    emergencyContact: "John Johnson - (555) 987-6543",
    allergies: ["Penicillin", "Shellfish", "Latex"],
    conditions: ["Hypertension", "Type 2 Diabetes"],
    medications: ["Metformin 500mg", "Lisinopril 10mg"],
    lastVisit: "January 15, 2024",
    nextAppointment: "March 20, 2024 - 2:00 PM"
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Patient Dashboard</h1>
          <p className="text-lg text-gray-600 mt-2">Welcome back, {patientData.name}</p>
        </div>
        <Button 
          onClick={onBack}
          variant="outline"
          className="hover:bg-gray-50 transition-colors duration-200"
        >
          Back to Home
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Patient Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-6 h-6 text-blue-600" />
                <span>Personal Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Full Name</label>
                  <p className="text-lg font-semibold text-gray-800">{patientData.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Patient ID</label>
                  <p className="text-lg font-semibold text-gray-800">{patientData.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                  <p className="text-lg font-semibold text-gray-800">{patientData.dateOfBirth}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <p className="text-lg font-semibold text-gray-800">{patientData.phone}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Address</label>
                <p className="text-lg font-semibold text-gray-800">{patientData.address}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Emergency Contact</label>
                <p className="text-lg font-semibold text-gray-800">{patientData.emergencyContact}</p>
              </div>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Hospital className="w-6 h-6 text-green-600" />
                <span>Medical Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">Allergies</label>
                <div className="flex flex-wrap gap-2">
                  {patientData.allergies.map((allergy, index) => (
                    <Badge key={index} variant="destructive" className="text-sm px-3 py-1">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">Current Conditions</label>
                <div className="flex flex-wrap gap-2">
                  {patientData.conditions.map((condition, index) => (
                    <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">Current Medications</label>
                <div className="space-y-2">
                  {patientData.medications.map((medication, index) => (
                    <div key={index} className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <p className="font-medium text-gray-800">{medication}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Appointments */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors duration-200">
                Schedule Appointment
              </Button>
              <Button variant="outline" className="w-full py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                View Test Results
              </Button>
              <Button variant="outline" className="w-full py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                Request Prescription Refill
              </Button>
              <Button variant="outline" className="w-full py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                Message Doctor
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Appointments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-sm font-medium text-green-800">Next Appointment</p>
                <p className="text-lg font-semibold text-green-900">{patientData.nextAppointment}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm font-medium text-gray-600">Last Visit</p>
                <p className="text-lg font-semibold text-gray-800">{patientData.lastVisit}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
