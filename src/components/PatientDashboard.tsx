
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { User, Hospital, Calendar, FileText, Search, Phone, AlertTriangle, Clock } from 'lucide-react';

interface PatientDashboardProps {
  onBack: () => void;
}

const PatientDashboard = ({ onBack }: PatientDashboardProps) => {
  const [searchTerm, setSearchTerm] = useState('');

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
    nextAppointment: "March 20, 2024 - 2:00 PM",
    medicalHistory: [
      {
        id: 1,
        condition: "Appendicitis",
        diagnosedDate: "June 2019",
        status: "Resolved",
        treatment: "Appendectomy",
        doctor: "Dr. Michael Brown"
      },
      {
        id: 2,
        condition: "Pneumonia",
        diagnosedDate: "December 2020",
        status: "Resolved",
        treatment: "Antibiotics",
        doctor: "Dr. Sarah Wilson"
      },
      {
        id: 3,
        condition: "Fractured Wrist",
        diagnosedDate: "August 2021",
        status: "Resolved",
        treatment: "Cast for 6 weeks",
        doctor: "Dr. James Davis"
      },
      {
        id: 4,
        condition: "Migraine",
        diagnosedDate: "March 2022",
        status: "Managed",
        treatment: "Preventive medication",
        doctor: "Dr. Emily Chen"
      },
      {
        id: 5,
        condition: "High Cholesterol",
        diagnosedDate: "January 2023",
        status: "Under Treatment",
        treatment: "Lifestyle changes and medication",
        doctor: "Dr. Robert Taylor"
      }
    ]
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'resolved':
        return 'default';
      case 'managed':
        return 'secondary';
      case 'under treatment':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const filteredHistory = patientData.medicalHistory.filter(history =>
    history.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    history.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    history.treatment.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      {/* Emergency Alert */}
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200 mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <div>
              <h3 className="text-lg font-semibold text-red-800">Medical Alert</h3>
              <p className="text-red-700">You have severe allergies to: {patientData.allergies.join(', ')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

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
              <div className="flex items-center justify-between bg-green-50 p-4 rounded-lg border border-green-200">
                <div>
                  <label className="text-sm font-medium text-green-800">Emergency Contact</label>
                  <p className="text-lg font-semibold text-green-900">{patientData.emergencyContact}</p>
                </div>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Hospital className="w-6 h-6 text-green-600" />
                <span>Current Medical Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">Allergies</label>
                <div className="flex flex-wrap gap-2">
                  {patientData.allergies.map((allergy, index) => (
                    <Badge key={index} variant="destructive" className="text-sm px-3 py-1">
                      <AlertTriangle className="w-3 h-3 mr-1" />
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
                    <div key={index} className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex items-center justify-between">
                      <p className="font-medium text-gray-800">{medication}</p>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        Daily
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical History */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-6 h-6 text-purple-600" />
                <span>Riwayat Penyakit</span>
              </CardTitle>
              <CardDescription>Daftar riwayat penyakit yang pernah diderita sebelumnya</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Cari riwayat penyakit, dokter, atau pengobatan..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((history) => (
                    <div key={history.id} className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-800 mb-1">{history.condition}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                            <Calendar className="w-4 h-4" />
                            <span>Diagnosed: {history.diagnosedDate}</span>
                          </div>
                        </div>
                        <Badge variant={getStatusBadgeVariant(history.status)} className="text-xs">
                          {history.status}
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <label className="font-medium text-gray-600">Treatment:</label>
                          <p className="text-gray-800">{history.treatment}</p>
                        </div>
                        <div>
                          <label className="font-medium text-gray-600">Doctor:</label>
                          <p className="text-gray-800">{history.doctor}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No medical history found matching your search.</p>
                  </div>
                )}
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
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Appointment
              </Button>
              <Button variant="outline" className="w-full py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <FileText className="w-4 h-4 mr-2" />
                View Test Results
              </Button>
              <Button variant="outline" className="w-full py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                Request Prescription Refill
              </Button>
              <Button variant="outline" className="w-full py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                Message Doctor
              </Button>
              <Button variant="destructive" className="w-full py-3 rounded-lg">
                <Phone className="w-4 h-4 mr-2" />
                Emergency Call
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
                <Button size="sm" variant="outline" className="mt-2 w-full">
                  Reschedule
                </Button>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm font-medium text-gray-600">Last Visit</p>
                <p className="text-lg font-semibold text-gray-800">{patientData.lastVisit}</p>
              </div>
            </CardContent>
          </Card>

          {/* Health Summary */}
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Health Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Conditions</span>
                <Badge variant="secondary">{patientData.conditions.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Current Medications</span>
                <Badge variant="secondary">{patientData.medications.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Known Allergies</span>
                <Badge variant="destructive">{patientData.allergies.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Medical History</span>
                <Badge variant="outline">{patientData.medicalHistory.length} records</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
