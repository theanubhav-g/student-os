import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Search, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const ScoreManagement = () => {
  const [students, setStudents] = useState([]);
  const [scores, setScores] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStudents();
    fetchScores();
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

  const fetchScores = async () => {
    try {
      const response = await api.get('/scores');
      if (response.data.success) {
        const scoresMap = {};
        response.data.data.forEach(s => {
          scoresMap[s.studentId] = { minor1: s.minor1, minor2: s.minor2 };
        });
        setScores(scoresMap);
      }
    } catch (error) {
      console.error('Error fetching scores:', error);
    }
  };

  const updateScores = async (studentId, minor1, minor2) => {
    try {
      const response = await api.put(`/scores/${studentId}`, { minor1, minor2 });
      if (response.data.success) {
        setScores({ ...scores, [studentId]: { minor1, minor2 } });
        toast.success('Scores updated');
      }
    } catch (error) {
      toast.error('Failed to update scores');
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Score Management</h1>
        <p className="text-gray-500 mt-1">Upload and manage student exam scores</p>
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
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Minor 1</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Minor 2</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => {
                const currentScores = scores[student.id] || { minor1: 0, minor2: 0 };
                return (
                  <tr key={student.id} className="border-b border-gray-100">
                    <td className="py-3 px-4">{student.name}</td>
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        defaultValue={currentScores.minor1}
                        className="w-20 px-2 py-1 border rounded"
                        id={`minor1-${student.id}`}
                      />
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        defaultValue={currentScores.minor2}
                        className="w-20 px-2 py-1 border rounded"
                        id={`minor2-${student.id}`}
                      />
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => {
                          const minor1 = parseInt(document.getElementById(`minor1-${student.id}`).value);
                          const minor2 = parseInt(document.getElementById(`minor2-${student.id}`).value);
                          updateScores(student.id, minor1, minor2);
                        }}
                        className="btn-primary text-sm py-1 px-3 flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
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

export default ScoreManagement;