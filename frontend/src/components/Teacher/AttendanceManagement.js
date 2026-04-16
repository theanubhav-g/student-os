import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Search, Save, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const AttendanceManagement = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStudents();
    fetchAttendance();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await api.get('/directory');
      if (response.data.success) {
        setStudents(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const response = await api.get('/attendance');
      if (response.data.success) {
        const attendanceMap = {};
        response.data.data.forEach(a => {
          attendanceMap[a.studentId] = a.percentage;
        });
        setAttendance(attendanceMap);
      }
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  const updateAttendance = async (studentId, percentage) => {
    try {
      const response = await api.put(`/attendance/${studentId}`, { percentage });
      if (response.data.success) {
        setAttendance({ ...attendance, [studentId]: percentage });
        if (percentage < 75) {
          toast.error(`Alert: ${students.find(s => s.id === studentId)?.name} has low attendance!`);
        } else {
          toast.success('Attendance updated');
        }
      }
    } catch (error) {
      toast.error('Failed to update');
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Attendance Management</h1>
        <p className="text-gray-500 mt-1">Update student attendance percentages</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Student Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Current Attendance</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Update</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => {
                const currentAttendance = attendance[student.id] || 85;
                const isLow = currentAttendance < 75;
                return (
                  <tr key={student.id} className="border-b border-gray-100">
                    <td className="py-3 px-4">{student.name}</td>
                    <td className="py-3 px-4">
                      <span className={isLow ? 'text-red-600 font-semibold' : 'text-green-600'}>
                        {currentAttendance}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          defaultValue={currentAttendance}
                          className="w-20 px-2 py-1 border rounded"
                          id={`attendance-${student.id}`}
                        />
                        <button
                          onClick={() => {
                            const input = document.getElementById(`attendance-${student.id}`);
                            updateAttendance(student.id, parseInt(input.value));
                          }}
                          className="btn-primary text-sm py-1 px-3"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {isLow && (
                        <div className="flex items-center gap-1 text-red-600">
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-sm">Low Attendance</span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceManagement;