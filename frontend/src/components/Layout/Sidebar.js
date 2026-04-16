import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Megaphone,
  CalendarCheck,
  TrendingUp,
  Briefcase,
  Users,
  UserPlus,
  Calendar,
  User,
  LogOut
} from 'lucide-react';

const Sidebar = ({ role }) => {
  const { logout } = useAuth();

  const studentNavItems = [
    { path: '/student', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/student/notices', label: 'Notices', icon: Megaphone },
    { path: '/student/attendance', label: 'Attendance', icon: CalendarCheck },
    { path: '/student/scores', label: 'Scores', icon: TrendingUp },
    { path: '/student/opportunities', label: 'Opportunities', icon: Briefcase },
    { path: '/student/directory', label: 'Directory', icon: Users },
    { path: '/student/teams', label: 'Team Board', icon: UserPlus },
    { path: '/student/events', label: 'Events', icon: Calendar },
    { path: '/student/profile', label: 'Profile', icon: User },
  ];

  const teacherNavItems = [
    { path: '/teacher', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/teacher/notices', label: 'Post Notice', icon: Megaphone },
    { path: '/teacher/attendance', label: 'Attendance', icon: CalendarCheck },
    { path: '/teacher/scores', label: 'Scores', icon: TrendingUp },
  ];

  const navItems = role === 'student' ? studentNavItems : teacherNavItems;

  return (
    <div className="w-72 bg-white border-r border-gray-100 fixed h-full">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8 pb-4 border-b border-gray-100">
          <div className="w-8 h-8 bg-gray-900 rounded-lg"></div>
          <span className="font-bold text-xl text-gray-900">Student OS</span>
        </div>
        
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="absolute bottom-6 left-6 right-6 pt-4 border-t border-gray-100">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 w-full transition-all duration-200 font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;