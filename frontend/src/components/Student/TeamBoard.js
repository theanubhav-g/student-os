import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Users, Plus, Mail, X } from 'lucide-react';
import toast from 'react-hot-toast';

const TeamBoard = () => {
  const { user } = useAuth();
  const [teams, setTeams] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skillsNeeded: '',
    contact: user?.email || ''
  });

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await api.get('/teams');
      if (response.data.success) {
        setTeams(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/teams', {
        ...formData,
        skillsNeeded: formData.skillsNeeded.split(',').map(s => s.trim()),
        postedBy: user?.name || 'Anonymous'
      });
      if (response.data.success) {
        toast.success('Team post created successfully!');
        setShowForm(false);
        setFormData({ title: '', description: '', skillsNeeded: '', contact: user?.email || '' });
        fetchTeams();
      }
    } catch (error) {
      toast.error('Failed to create post');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Team Formation Board</h1>
          <p className="text-gray-500 mt-1">Find teammates for projects and hackathons</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Post Requirement
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Post Team Requirement</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Project/Hackathon Title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="input-field"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="input-field"
                rows="3"
                required
              />
              <input
                type="text"
                placeholder="Skills Needed (comma-separated)"
                value={formData.skillsNeeded}
                onChange={(e) => setFormData({...formData, skillsNeeded: e.target.value})}
                className="input-field"
                required
              />
              <input
                type="email"
                placeholder="Contact Email"
                value={formData.contact}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
                className="input-field"
                required
              />
              <button type="submit" className="btn-primary w-full">Post</button>
            </form>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {teams.map((team) => (
          <div key={team.id} className="card">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{team.title}</h3>
                <p className="text-gray-600 mb-3">{team.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {team.skillsNeeded.map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Posted by: {team.postedBy}</span>
                  <span>Posted: {new Date(team.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <a href={`mailto:${team.contact}`} className="btn-secondary flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Contact
              </a>
            </div>
          </div>
        ))}
        {teams.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No team posts yet. Be the first to post!
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamBoard;