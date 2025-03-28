import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('registrations');

  // Redirect if not admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/registrations', {
          headers: {
            'x-auth-token': token
          }
        });
        setRegistrations(response.data);
      } catch (error) {
        console.error('Error fetching registrations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [token]);

  // Function to handle creating a new event
  const handleCreateEvent = () => {
    // This would typically open a modal or navigate to event creation form
    alert('Event creation form would open here');
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'registrations' ? 'active' : ''}`}
          onClick={() => setActiveTab('registrations')}
        >
          Registrations
        </button>
        <button 
          className={`tab-btn ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          Manage Events
        </button>
        <button 
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
      </div>
      
      <div className="dashboard-content">
        {activeTab === 'registrations' && (
          <div className="registrations-list">
            <h2>Event Registrations</h2>
            {loading ? (
              <p>Loading registrations...</p>
            ) : registrations.length === 0 ? (
              <p>No registrations found.</p>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Registration ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Event</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map(reg => (
                    <tr key={reg._id}>
                      <td>{reg.registrationId}</td>
                      <td>{reg.name}</td>
                      <td>{reg.email}</td>
                      <td>{reg.eventId.title}</td>
                      <td>{new Date(reg.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button className="btn btn-sm">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
        
        {activeTab === 'events' && (
          <div className="events-management">
            <div className="section-header">
              <h2>Manage Events</h2>
              <button className="btn btn-primary" onClick={handleCreateEvent}>
                Create New Event
              </button>
            </div>
            
            <p>Event management functionality would be implemented here.</p>
            {/* Event list and management UI would go here */}
          </div>
        )}
        
        {activeTab === 'users' && (
          <div className="users-list">
            <h2>User Management</h2>
            <p>User management functionality would be implemented here.</p>
            {/* User list and management UI would go here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
