import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Upload, FileText, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const NoticeUpload = () => {
  const { user } = useAuth();
  const [notices, setNotices] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    fileLink: '',
    teacherId: user.teacherId,
    teacherName: user.name
  });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await api.get('/notices');
      if (response.data.success) {
        setNotices(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/notices', formData);
      if (response.data.success) {
        toast.success('Notice posted successfully!');
        setFormData({ title: '', description: '', deadline: '', fileLink: '', teacherId: user.teacherId, teacherName: user.name });
        fetchNotices();
      }
    } catch (error) {
      toast.error('Failed to post notice');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/notices/${id}`);
      if (response.data.success) {
        toast.success('Notice deleted');
        fetchNotices();
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Post Notice</h1>
        <p className="text-gray-500 mt-1">Share announcements and assignments with students</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="input-field"
              rows="4"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({...formData, deadline: e.target.value})}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Assignment File Link</label>
            <input
              type="url"
              value={formData.fileLink}
              onChange={(e) => setFormData({...formData, fileLink: e.target.value})}
              className="input-field"
              placeholder="https://example.com/assignment.pdf"
            />
            <p className="text-xs text-gray-500 mt-1">Example: https://example.com/assignment.pdf</p>
          </div>
          <button type="submit" className="btn-primary flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Post Notice
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Posted Notices</h2>
        <div className="space-y-3">
          {notices.map((notice) => (
            <div key={notice.id} className="card">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{notice.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{notice.description}</p>
                  {notice.deadline && (
                    <p className="text-xs text-red-600 mt-2">Deadline: {new Date(notice.deadline).toLocaleDateString()}</p>
                  )}
                </div>
                <button onClick={() => handleDelete(notice.id)} className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoticeUpload;