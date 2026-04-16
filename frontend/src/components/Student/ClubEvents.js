import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Calendar, MapPin, Clock, Users, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const ClubEvents = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    club: '',
    description: '',
    date: '',
    time: '',
    venue: ''
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events');
      if (response.data.success) {
        setEvents(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleRSVP = async (eventId) => {
    try {
      const response = await api.post(`/events/${eventId}/rsvp`, {
        studentId: user.studentId,
        studentName: user.name
      });
      if (response.data.success) {
        toast.success('RSVP successful!');
        fetchEvents();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to RSVP');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/events', formData);
      if (response.data.success) {
        toast.success('Event created successfully!');
        setShowForm(false);
        setFormData({ title: '', club: '', description: '', date: '', time: '', venue: '' });
        fetchEvents();
      }
    } catch (error) {
      toast.error('Failed to create event');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Club Events</h1>
          <p className="text-gray-500 mt-1">Discover and join campus events</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Event
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Create Club Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Event Title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="input-field"
                required
              />
              <input
                type="text"
                placeholder="Club Name"
                value={formData.club}
                onChange={(e) => setFormData({...formData, club: e.target.value})}
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
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="input-field"
                required
              />
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="input-field"
                required
              />
              <input
                type="text"
                placeholder="Venue"
                value={formData.venue}
                onChange={(e) => setFormData({...formData, venue: e.target.value})}
                className="input-field"
                required
              />
              <button type="submit" className="btn-primary w-full">Create Event</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary w-full">Cancel</button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div key={event.id} className="card hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{event.title}</h3>
            <p className="text-sm text-blue-600 mb-2">{event.club}</p>
            <p className="text-gray-600 mb-3">{event.description}</p>
            <div className="space-y-2 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{event.venue}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{event.registrations?.length || 0} registered</span>
              </div>
            </div>
            <button
              onClick={() => handleRSVP(event.id)}
              className="btn-primary w-full"
              disabled={event.registrations?.some(r => r.studentId === user.studentId)}
            >
              {event.registrations?.some(r => r.studentId === user.studentId) ? 'Already Registered' : 'RSVP Now'}
            </button>
          </div>
        ))}
        {events.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            No events available
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubEvents;