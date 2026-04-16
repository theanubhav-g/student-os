import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../Layout/Sidebar';
import Navbar from '../Layout/Navbar';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Calendar, Bell, TrendingUp, Users, Target, Award } from 'lucide-react';
import NoticeBoard from './NoticeBoard';
import AttendanceTracker from './AttendanceTracker';
import ScoresSection from './ScoresSection';
import OpportunityFeed from './OpportunityFeed';
import StudentDirectory from './StudentDirectory';
import TeamBoard from './TeamBoard';
import ClubEvents from './ClubEvents';
import StudentProfile from './StudentProfile';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    attendance: { percentage: 85 },
    scores: { minor1: 75, minor2: 80 },
    recentNotices: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get(`/students/${user.studentId}/dashboard`);
      if (response.data.success) {
        setDashboardData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    }
  };

  const DashboardHome = () => (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Good morning, {user?.name?.split(' ')[0]}! 👋</h1>
        <p className="text-gray-500 mt-1">Here's what's happening with your academics today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Attendance</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{dashboardData.attendance?.percentage || 0}%</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-gray-900" />
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Minor Exam 1</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{dashboardData.scores?.minor1 || 0}/100</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-gray-900" />
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Minor Exam 2</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{dashboardData.scores?.minor2 || 0}/100</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-gray-900" />
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Recent Notices</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{dashboardData.recentNotices?.length || 0}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
              <Bell className="w-6 h-6 text-gray-900" />
            </div>
          </div>
        </div>
      </div>

      {/* Low Attendance Alert */}
      {dashboardData.attendance?.percentage < 75 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-red-600 text-lg">⚠️</span>
          </div>
          <div>
            <h3 className="font-semibold text-red-800">Low Attendance Alert</h3>
            <p className="text-red-700 text-sm mt-1">
              Your attendance is {dashboardData.attendance?.percentage}%. Please maintain at least 75% to be eligible for exams.
            </p>
          </div>
        </div>
      )}

      {/* Recent Notices Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Notices</h2>
          <button className="text-gray-500 text-sm hover:text-gray-900 transition">View all →</button>
        </div>
        <div className="grid gap-4">
          {dashboardData.recentNotices?.slice(0, 3).map((notice) => (
            <div key={notice.id} className="card">
              <h3 className="font-semibold text-gray-900">{notice.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{notice.description}</p>
              {notice.deadline && (
                <p className="text-xs text-red-500 mt-3">Deadline: {new Date(notice.deadline).toLocaleDateString()}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="student" />
      <div className="flex-1 ml-72">
        <Navbar />
        <main className="p-8">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/notices" element={<NoticeBoard />} />
            <Route path="/attendance" element={<AttendanceTracker />} />
            <Route path="/scores" element={<ScoresSection />} />
            <Route path="/opportunities" element={<OpportunityFeed />} />
            <Route path="/directory" element={<StudentDirectory />} />
            <Route path="/teams" element={<TeamBoard />} />
            <Route path="/events" element={<ClubEvents />} />
            <Route path="/profile" element={<StudentProfile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;