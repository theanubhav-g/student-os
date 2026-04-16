import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { TrendingUp, Award, Target } from 'lucide-react';

const ScoresSection = () => {
  const { user } = useAuth();
  const [scores, setScores] = useState({ minor1: 0, minor2: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    try {
      const response = await api.get(`/scores/student/${user.studentId}`);
      if (response.data.success && response.data.data) {
        setScores(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching scores:', error);
      setLoading(false);
    }
  };

  const getGrade = (score) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B+';
    if (score >= 60) return 'B';
    if (score >= 50) return 'C';
    return 'F';
  };

  const getColorClass = (score) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Academic Scores</h1>
        <p className="text-gray-500 mt-1">Track your performance in minor exams</p>
      </div>

      {!loading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-800">Minor Exam 1</h3>
                </div>
                <span className="text-2xl font-bold">
                  <span className={getColorClass(scores.minor1)}>{scores.minor1}</span>
                  <span className="text-gray-500 text-sm">/100</span>
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Grade</span>
                  <span className="font-semibold">{getGrade(scores.minor1)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 rounded-full h-2"
                    style={{ width: `${scores.minor1}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-800">Minor Exam 2</h3>
                </div>
                <span className="text-2xl font-bold">
                  <span className={getColorClass(scores.minor2)}>{scores.minor2}</span>
                  <span className="text-gray-500 text-sm">/100</span>
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Grade</span>
                  <span className="font-semibold">{getGrade(scores.minor2)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 rounded-full h-2"
                    style={{ width: `${scores.minor2}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold text-gray-800 mb-4">Academic Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Average Score</span>
                <span className="font-semibold">
                  {((scores.minor1 + scores.minor2) / 2).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Performance</span>
                <span className={`font-semibold ${getColorClass((scores.minor1 + scores.minor2) / 2)}`}>
                  {((scores.minor1 + scores.minor2) / 2) >= 75 ? 'Excellent' : 
                   ((scores.minor1 + scores.minor2) / 2) >= 60 ? 'Good' : 'Needs Improvement'}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ScoresSection;