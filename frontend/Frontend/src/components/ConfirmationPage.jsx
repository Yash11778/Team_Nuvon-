import { useParams, useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ConfirmationPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [registrationData, setRegistrationData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, you would fetch the registration data from your backend using the ID
    if (location.state?.registrationData) {
      setRegistrationData(location.state.registrationData);
    } else {
      // Mock fetching data if navigated directly to this page
      setTimeout(() => {
        setRegistrationData({
          name: 'Test User',
          email: 'test@example.com',
          eventId: '1'
        });
      }, 1000);
    }
    setLoading(false);
  }, [id, location]);

  const events = {
    '1': 'Tech Conference 2023',
    '2': 'Hackathon Challenge',
    '3': 'Web Development Workshop'
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="confirmation-page">
      <div className="success-animation">✓</div>
      <h1>Registration Successful!</h1>
      <p>Thank you for registering for our event.</p>
      
      {registrationData && (
        <div className="registration-details">
          <h2>Registration Details</h2>
          <p><strong>Registration ID:</strong> {id}</p>
          <p><strong>Name:</strong> {registrationData.name}</p>
          <p><strong>Email:</strong> {registrationData.email}</p>
          <p><strong>Event:</strong> {events[registrationData.eventId]}</p>
          
          <p>A confirmation email has been sent to your registered email address.</p>
        </div>
      )}
      
      <div className="action-buttons">
        <Link to={`/ticket/${id}`}>
          <button className="btn btn-primary">View Ticket</button>
        </Link>
        <Link to="/events">
          <button className="btn">View Event Schedule</button>
        </Link>
      </div>
    </div>
  );
};

export default ConfirmationPage;
