import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Briefcase, Calendar, ExternalLink } from 'lucide-react';

const OpportunityFeed = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      const response = await api.get('/opportunities');
      if (response.data.success) {
        setOpportunities(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    }
  };

  const filteredOpportunities = opportunities.filter(opp => 
    filter === 'all' || opp.type === filter
  );

  const getTypeColor = (type) => {
    switch(type) {
      case 'internship': return 'bg-green-100 text-green-700';
      case 'hackathon': return 'bg-purple-100 text-purple-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Opportunities</h1>
        <p className="text-gray-500 mt-1">Discover internships, hackathons, and more</p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('internship')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'internship' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Internships
        </button>
        <button
          onClick={() => setFilter('hackathon')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'hackathon' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Hackathons
        </button>
      </div>

      <div className="grid gap-4">
        {filteredOpportunities.map((opp) => (
          <div key={opp.id} className="card hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{opp.title}</h3>
                <p className="text-gray-600 mb-3">{opp.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className={`px-2 py-1 rounded-full ${getTypeColor(opp.type)}`}>
                    {opp.type.charAt(0).toUpperCase() + opp.type.slice(1)}
                  </span>
                  {opp.company && <span>🏢 {opp.company}</span>}
                  {opp.organizer && <span>👥 {opp.organizer}</span>}
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Deadline: {new Date(opp.deadline).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <a
                href={opp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2"
              >
                Apply <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
        {filteredOpportunities.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No opportunities found
          </div>
        )}
      </div>
    </div>
  );
};

export default OpportunityFeed;