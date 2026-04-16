import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { User, Award, Code, Edit2, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

const StudentProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get(`/students/${user.studentId}/profile`);
      if (response.data.success) {
        setProfile(response.data.data);
        setEditData(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await api.put(`/students/${user.studentId}/profile`, editData);
      if (response.data.success) {
        setProfile(response.data.data);
        setIsEditing(false);
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-500 mt-1">Your digital identity at Student OS</p>
        </div>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="btn-secondary flex items-center gap-2">
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={handleSave} className="btn-primary flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="btn-secondary flex items-center gap-2">
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="card text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-4">
              <User className="w-12 h-12 text-blue-600" />
            </div>
            {!isEditing ? (
              <>
                <h2 className="text-xl font-bold">{profile?.name}</h2>
                <p className="text-gray-500">{profile?.email}</p>
                <p className="text-sm text-blue-600 mt-2">{profile?.year} • {profile?.major}</p>
              </>
            ) : (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editData.name || ''}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                  className="input-field text-center"
                />
                <input
                  type="text"
                  value={editData.year || ''}
                  onChange={(e) => setEditData({...editData, year: e.target.value})}
                  className="input-field text-center"
                  placeholder="Year"
                />
                <input
                  type="text"
                  value={editData.major || ''}
                  onChange={(e) => setEditData({...editData, major: e.target.value})}
                  className="input-field text-center"
                  placeholder="Major"
                />
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Code className="w-5 h-5 text-blue-600" />
              Skills
            </h3>
            {!isEditing ? (
              <div className="flex flex-wrap gap-2">
                {profile?.skills?.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <input
                type="text"
                value={editData.skills?.join(', ') || ''}
                onChange={(e) => setEditData({...editData, skills: e.target.value.split(',').map(s => s.trim())})}
                className="input-field"
                placeholder="Skills (comma-separated)"
              />
            )}
          </div>

          <div className="card">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              Achievements
            </h3>
            {!isEditing ? (
              <ul className="space-y-2">
                {profile?.achievements?.map((achievement, idx) => (
                  <li key={idx} className="text-gray-600">• {achievement}</li>
                ))}
              </ul>
            ) : (
              <textarea
                value={editData.achievements?.join('\n') || ''}
                onChange={(e) => setEditData({...editData, achievements: e.target.value.split('\n').filter(a => a.trim())})}
                className="input-field"
                rows="4"
                placeholder="One achievement per line"
              />
            )}
          </div>

          <div className="card">
            <h3 className="font-semibold text-gray-800 mb-3">Bio</h3>
            {!isEditing ? (
              <p className="text-gray-600">{profile?.bio}</p>
            ) : (
              <textarea
                value={editData.bio || ''}
                onChange={(e) => setEditData({...editData, bio: e.target.value})}
                className="input-field"
                rows="3"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;