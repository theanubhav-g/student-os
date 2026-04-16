import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FileText, Calendar, Download } from 'lucide-react';

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Notice Board</h1>
        <p className="text-gray-500 mt-1">Stay updated with latest announcements</p>
      </div>

      <div className="grid gap-4">
        {notices.map((notice) => (
          <div key={notice.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">{notice.title}</h3>
                </div>
                <p className="text-gray-600 mb-3">{notice.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  {notice.deadline && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Deadline: {new Date(notice.deadline).toLocaleDateString()}</span>
                    </div>
                  )}
                  {notice.fileLink && (
                    <a
                      href={notice.fileLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Assignment</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {notices.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No notices available
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeBoard;