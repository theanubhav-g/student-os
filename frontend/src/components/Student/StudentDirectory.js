import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Search, Mail, Code, Users } from 'lucide-react';

const StudentDirectory = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDirectory();
  }, []);

  const fetchDirectory = async () => {
    try {
      const response = await api.get('/directory');
      if (response.data.success) {
        setStudents(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching directory:', error);
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
    student.major.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Student Directory</h1>
        <p className="text-gray-500 mt-1">Discover and connect with peers</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, skill, or major..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <div key={student.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-800">{student.name}</h3>
                <p className="text-sm text-gray-500">{student.major} • {student.year}</p>
              </div>
              <Users className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-sm text-gray-600 mb-3">{student.bio}</p>
            <div className="mb-3">
              <div className="flex items-center gap-1 mb-2">
                <Code className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-medium text-gray-700">Skills</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {student.skills.map((skill, idx) => (
                  <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <a
              href={`mailto:${student.email}`}
              className="btn-secondary w-full flex items-center justify-center gap-2 text-sm"
            >
              <Mail className="w-4 h-4" />
              Contact
            </a>
          </div>
        ))}
        {filteredStudents.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            No students found
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDirectory;