import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../Layout/Sidebar';
import Navbar from '../Layout/Navbar';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Users, FileText, Calendar, TrendingUp, PlusCircle } from 'lucide-react';
import NoticeUpload from './NoticeUpload';
import AttendanceManagement from './AttendanceManagement';
import ScoreManagement from './ScoreManagement';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalStudents: 0,
    recentUploads: 0,
    activeNotices: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get(`/teachers/${user.teacherId}/dashboard`);
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const DashboardHome = () => (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, Prof. {user?.name?.split(' ')[1]}! 👨‍🏫</h1>
        <p className="text-gray-500 mt-1">Here's what's happening in your classes today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Students</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalStudents}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-gray-900" />
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Recent Uploads</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.recentUploads}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-gray-900" />
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Notices</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.activeNotices}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-gray-900" />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-6 bg-gray-50 rounded-2xl text-left hover:bg-gray-100 transition-all duration-300 group">
            <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <p className="font-semibold text-gray-900">Post New Notice</p>
            <p className="text-sm text-gray-500 mt-1">Share announcements with students</p>
          </button>
          
          <button className="p-6 bg-gray-50 rounded-2xl text-left hover:bg-gray-100 transition-all duration-300 group">
            <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <p className="font-semibold text-gray-900">Update Attendance</p>
            <p className="text-sm text-gray-500 mt-1">Manage student attendance records</p>
          </button>
          
          <button className="p-6 bg-gray-50 rounded-2xl text-left hover:bg-gray-100 transition-all duration-300 group">
            <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <p className="font-semibold text-gray-900">Upload Scores</p>
            <p className="text-sm text-gray-500 mt-1">Enter exam results</p>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="teacher" />
      <div className="flex-1 ml-72">
        <Navbar />
        <main className="p-8">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/notices" element={<NoticeUpload />} />
            <Route path="/attendance" element={<AttendanceManagement />} />
            <Route path="/scores" element={<ScoreManagement />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;