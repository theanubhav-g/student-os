import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, ArrowRight, Sparkles } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      toast.success('Welcome back!');
      navigate(`/${result.role}`);
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Brand Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 to-gray-800 text-white p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-gray-900" />
            </div>
            <span className="text-xl font-bold">Student OS</span>
          </div>
          
          <div className="mt-20">
            <h1 className="text-5xl font-bold mb-6">
              Your Learning Journey,
              <span className="block mt-2">Simplified.</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              No more juggling between multiple apps. Everything you need in one beautiful dashboard.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Sparkles className="w-4 h-4" />
              <span>Trusted by 10,000+ students</span>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-gray-500">
          © 2026 Student OS. All rights reserved.
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-900 rounded-xl mb-4">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold">Student OS</h2>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
            <p className="text-gray-500 mt-2">Login to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Login as
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`py-3 rounded-xl border-2 transition-all font-medium ${
                    role === 'student'
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-200 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setRole('teacher')}
                  className={`py-3 rounded-xl border-2 transition-all font-medium ${
                    role === 'teacher'
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-200 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  Teacher
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
              Login
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm font-medium text-gray-700 mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-sm text-gray-500">
              <p>📧 Student: student@studentos.com / student123</p>
              <p>📧 Teacher: teacher@studentos.com / teacher123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;