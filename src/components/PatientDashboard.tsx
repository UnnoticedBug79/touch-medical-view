
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Calendar as CalendarIcon, 
  User, 
  Heart, 
  Activity, 
  FileText, 
  Phone, 
  Clock, 
  Search,
  MapPin,
  Stethoscope,
  Users,
  AlertCircle
} from 'lucide-react';
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface PatientDashboardProps {
  onBack: () => void;
}

interface MedicalHistory {
  id: string;
  diagnosis: string;
  date: string;
  doctor: string;
  treatment: string;
  status: 'Recovered' | 'Ongoing' | 'Chronic';
}

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  department: string;
  type: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

const PatientDashboard = ({ onBack }: PatientDashboardProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [appointmentType, setAppointmentType] = useState<string>('');
  const [appointmentReason, setAppointmentReason] = useState<string>('');

  // Mock data for medical history
  const medicalHistory: MedicalHistory[] = [
    {
      id: '1',
      diagnosis: 'Hypertension',
      date: '2024-01-15',
      doctor: 'Dr. Sarah Johnson',
      treatment: 'ACE Inhibitors, lifestyle changes',
      status: 'Ongoing'
    },
    {
      id: '2',
      diagnosis: 'Common Cold',
      date: '2023-12-10',
      doctor: 'Dr. Michael Chen',
      treatment: 'Rest, fluids, symptomatic treatment',
      status: 'Recovered'
    },
    {
      id: '3',
      diagnosis: 'Type 2 Diabetes',
      date: '2023-08-22',
      doctor: 'Dr. Emily Rodriguez',
      treatment: 'Metformin, diet control, exercise',
      status: 'Chronic'
    },
    {
      id: '4',
      diagnosis: 'Seasonal Allergies',
      date: '2023-06-05',
      doctor: 'Dr. David Kim',
      treatment: 'Antihistamines, allergen avoidance',
      status: 'Ongoing'
    }
  ];

  // Mock data for upcoming appointments
  const upcomingAppointments: Appointment[] = [
    {
      id: '1',
      date: '2024-06-10',
      time: '10:00 AM',
      doctor: 'Dr. Sarah Johnson',
      department: 'Cardiology',
      type: 'Follow-up',
      status: 'Scheduled'
    },
    {
      id: '2',
      date: '2024-06-15',
      time: '2:30 PM',
      doctor: 'Dr. Emily Rodriguez',
      department: 'Endocrinology',
      type: 'Regular Check-up',
      status: 'Scheduled'
    }
  ];

  // Available time slots
  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  // Available doctors
  const doctors = [
    { id: 'dr1', name: 'Dr. Sarah Johnson', department: 'Cardiology' },
    { id: 'dr2', name: 'Dr. Michael Chen', department: 'Internal Medicine' },
    { id: 'dr3', name: 'Dr. Emily Rodriguez', department: 'Endocrinology' },
    { id: 'dr4', name: 'Dr. David Kim', department: 'Allergy & Immunology' },
    { id: 'dr5', name: 'Dr. Lisa Wong', department: 'Dermatology' },
    { id: 'dr6', name: 'Dr. James Miller', department: 'Orthopedics' }
  ];

  // Available departments
  const departments = [
    'Cardiology', 'Internal Medicine', 'Endocrinology', 'Allergy & Immunology',
    'Dermatology', 'Orthopedics', 'Neurology', 'Gastroenterology'
  ];

  // Appointment types
  const appointmentTypes = [
    'Regular Check-up', 'Follow-up', 'Consultation', 'Emergency', 'Specialist Referral'
  ];

  const filteredHistory = medicalHistory.filter(item =>
    item.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.treatment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Recovered': return 'text-green-600 bg-green-100';
      case 'Ongoing': return 'text-yellow-600 bg-yellow-100';
      case 'Chronic': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleScheduleAppointment = () => {
    if (!selectedDate || !selectedTime || !selectedDoctor || !appointmentType) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Here you would typically send the appointment data to your backend
    console.log('Scheduling appointment:', {
      date: selectedDate,
      time: selectedTime,
      doctor: selectedDoctor,
      department: selectedDepartment,
      type: appointmentType,
      reason: appointmentReason
    });
    
    alert('Appointment scheduled successfully!');
    
    // Reset form
    setSelectedDate(undefined);
    setSelectedTime('');
    setSelectedDoctor('');
    setSelectedDepartment('');
    setAppointmentType('');
    setAppointmentReason('');
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex items-center gap-2 hover:bg-blue-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Patient Dashboard</h1>
            <p className="text-gray-600">Welcome back, John Doe</p>
          </div>
        </div>
      </div>

      {/* Health Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Heart Rate</p>
                <p className="text-2xl font-bold text-red-500">72 bpm</p>
              </div>
              <Heart className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Blood Pressure</p>
                <p className="text-2xl font-bold text-blue-500">120/80</p>
              </div>
              <Activity className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Weight</p>
                <p className="text-2xl font-bold text-green-500">70 kg</p>
              </div>
              <User className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Next Appointment</p>
                <p className="text-lg font-bold text-purple-500">Jun 10</p>
              </div>
              <CalendarIcon className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Schedule New Appointment */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Schedule New Appointment
            </CardTitle>
            <CardDescription>
              Book your next medical appointment with our healthcare professionals
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Date Selection */}
            <div className="space-y-2">
              <Label htmlFor="appointment-date">Select Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Department Selection */}
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Doctor Selection */}
            <div className="space-y-2">
              <Label htmlFor="doctor">Doctor *</Label>
              <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                <SelectTrigger>
                  <SelectValue placeholder="Select doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors
                    .filter(doctor => !selectedDepartment || doctor.department === selectedDepartment)
                    .map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.name}>
                      {doctor.name} - {doctor.department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Time Selection */}
            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Appointment Type */}
            <div className="space-y-2">
              <Label htmlFor="type">Appointment Type *</Label>
              <Select value={appointmentType} onValueChange={setAppointmentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select appointment type" />
                </SelectTrigger>
                <SelectContent>
                  {appointmentTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Reason for Visit */}
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Visit</Label>
              <Textarea
                id="reason"
                placeholder="Describe your symptoms or reason for the visit..."
                value={appointmentReason}
                onChange={(e) => setAppointmentReason(e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            <Button 
              onClick={handleScheduleAppointment}
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
              size="lg"
            >
              <Clock className="w-4 h-4 mr-2" />
              Schedule Appointment
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Upcoming Appointments
            </CardTitle>
            <CardDescription>
              Your scheduled medical appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4 text-blue-500" />
                          <span className="font-semibold">{appointment.date}</span>
                          <span className="text-gray-600">{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Stethoscope className="w-4 h-4 text-green-500" />
                          <span>{appointment.doctor}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-purple-500" />
                          <span className="text-sm text-gray-600">{appointment.department}</span>
                        </div>
                        <div className="text-sm text-gray-500">{appointment.type}</div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        appointment.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                        appointment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CalendarIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No upcoming appointments</p>
                <p className="text-sm">Schedule your next appointment above</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Medical History */}
        <Card className="glass-effect lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Medical History
                </CardTitle>
                <CardDescription>
                  Complete record of your past medical conditions and treatments
                </CardDescription>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search medical history..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredHistory.length > 0 ? (
              <div className="space-y-4">
                {filteredHistory.map((record) => (
                  <div key={record.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{record.diagnosis}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                            {record.status}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4" />
                            <span>Date: {record.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>Doctor: {record.doctor}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <FileText className="w-4 h-4 mt-0.5" />
                            <span>Treatment: {record.treatment}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No medical history found</p>
                {searchTerm && <p className="text-sm">Try adjusting your search terms</p>}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Emergency Contacts
            </CardTitle>
            <CardDescription>
              Quick access to your emergency contacts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Dr. Sarah Johnson</p>
                    <p className="text-sm text-gray-600">Primary Care Physician</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Jane Doe</p>
                    <p className="text-sm text-gray-600">Emergency Contact</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <Button variant="destructive" className="w-full">
                <AlertCircle className="w-4 h-4 mr-2" />
                Emergency Services (911)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Frequently used patient services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <FileText className="w-6 h-6" />
                <span className="text-sm">Request Records</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Activity className="w-6 h-6" />
                <span className="text-sm">Lab Results</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Heart className="w-6 h-6" />
                <span className="text-sm">Prescriptions</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Phone className="w-6 h-6" />
                <span className="text-sm">Contact Support</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientDashboard;
