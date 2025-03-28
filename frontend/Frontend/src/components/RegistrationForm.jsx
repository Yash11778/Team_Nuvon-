import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const preselectedEvent = params.get('event');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventId: preselectedEvent || '',
    organization: '',
    dietary: '',
    specialRequests: ''
  });

  const events = [
    { id: '1', name: 'Tech Conference 2023' },
    { id: '2', name: 'Hackathon Challenge' },
    { id: '3', name: 'Web Development Workshop' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, you would send this data to your backend
    console.log('Form submitted:', formData);
    
    // Generate a unique registration ID (in real app this would come from the backend)
    const registrationId = 'REG' + Date.now().toString().slice(-6);
    
    // Navigate to confirmation page
    navigate(`/confirmation/${registrationId}`, { state: { registrationData: formData } });
  };

  return (
    <div className="form-container">
      <h1>Event Registration</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="event">Select Event *</label>
          <select 
            id="eventId" 
            name="eventId" 
            className="form-control"
            value={formData.eventId}
            onChange={handleChange}
            required
          >
            <option value="">-- Select an event --</option>
            {events.map(event => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="organization">Organization/Company</label>
          <input
            type="text"
            id="organization"
            name="organization"
            className="form-control"
            value={formData.organization}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="dietary">Dietary Restrictions</label>
          <select
            id="dietary"
            name="dietary"
            className="form-control"
            value={formData.dietary}
            onChange={handleChange}
          >
            <option value="">None</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten-free">Gluten-free</option>
            <option value="dairy-free">Dairy-free</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="specialRequests">Special Requests</label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            className="form-control"
            value={formData.specialRequests}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>
        
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
