import { useParams, useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { success } from '../assets/animations';

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
    <motion.div 
      className="confirmation-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="success-animation"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Lottie animationData={success} loop={false} style={{ height: 200 }} />
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Registration Successful!
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Thank you for registering for our event.
      </motion.p>
      
      {registrationData && (
        <motion.div 
          className="registration-details"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2>Registration Details</h2>
          <div className="details-grid">
            <div className="detail-item">
              <div className="detail-label">Registration ID:</div>
              <div className="detail-value">{id}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Name:</div>
              <div className="detail-value">{registrationData.name}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Email:</div>
              <div className="detail-value">{registrationData.email}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Event:</div>
              <div className="detail-value">{events[registrationData.eventId]}</div>
            </div>
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            A confirmation email has been sent to your registered email address.
          </motion.p>
        </motion.div>
      )}
      
      <motion.div 
        className="action-buttons"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Link to={`/ticket/${id}`}>
          <motion.button 
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Ticket
          </motion.button>
        </Link>
        <Link to="/events">
          <motion.button 
            className="btn btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Event Schedule
          </motion.button>
        </Link>
      </motion.div>
      
      <motion.div 
        className="next-steps"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h3>Next Steps</h3>
        <ul>
          <li>Save your ticket to your phone</li>
          <li>Add the event to your calendar</li>
          <li>Share with friends and colleagues</li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default ConfirmationPage;
