import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { CalendarCheck, AlertCircle, TrendingUp } from 'lucide-react';

const AttendanceTracker = () => {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState({ percentage: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await api.get(`/attendance/student/${user.studentId}`);
      if (response.data.success && response.data.data) {
        setAttendance(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching attendance:', error);
      setLoading(false);
    }
  };

  const getColorClass = () => {
    if (attendance.percentage >= 75) return 'text-green-600';
    if (attendance.percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusText = () => {
    if (attendance.percentage >= 75) return 'Good Standing';
    if (attendance.percentage >= 60) return 'At Risk';
    return 'Critical';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Attendance Tracker</h1>
        <p className="text-gray-500 mt-1">Monitor your attendance percentage</p>
      </div>

      {!loading && (
        <>
          <div className="card">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-4">
                <CalendarCheck className="w-12 h-12 text-blue-600" />
              </div>
              <h2 className="text-4xl font-bold mb-2">
                <span className={getColorClass()}>{attendance.percentage}%</span>
              </h2>
              <p className="text-gray-600">Overall Attendance</p>
              <div className={`mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium
                ${attendance.percentage >= 75 ? 'bg-green-100 text-green-700' : 
                  attendance.percentage >= 60 ? 'bg-yellow-100 text-yellow-700' : 
                  'bg-red-100 text-red-700'}`}>
                <TrendingUp className="w-4 h-4" />
                {getStatusText()}
              </div>
            </div>
          </div>

          {attendance.percentage < 75 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-800">Low Attendance Alert!</h3>
                <p className="text-red-700 text-sm">
                  Your attendance is below 75%. Please attend more classes to meet the minimum requirement for exams.
                </p>
              </div>
            </div>
          )}

          <div className="card">
            <h3 className="font-semibold text-gray-800 mb-4">Attendance Guidelines</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Minimum 75% attendance required for exam eligibility</li>
              <li>• Medical emergencies require proper documentation</li>
              <li>• Check with your class coordinator for leave applications</li>
              <li>• Attendance is updated weekly by faculty</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default AttendanceTracker;