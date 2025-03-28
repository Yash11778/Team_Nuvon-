import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { ticket as ticketAnimation, loading } from '../assets/animations';

const Ticket = () => {
  const { id } = useParams();
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch the ticket data from your backend
    setTimeout(() => {
      setTicketData({
        id: id,
        name: 'Test User',
        email: 'test@example.com',
        eventName: 'Tech Conference 2023',
        eventDate: 'October 15, 2023',
        eventLocation: 'Tech Center, Main Hall',
        ticketType: 'Standard Entry'
      });
      setLoading(false);
    }, 1500);
  }, [id]);

  const handleDownload = () => {
    // In a real app, you would generate a PDF ticket for download
    alert('Ticket download functionality would be implemented here');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Event Ticket',
        text: `Check out my ticket for ${ticketData.eventName}!`,
        url: window.location.href
      })
      .catch(error => console.log('Error sharing:', error));
    } else {
      alert('Web Share API not supported in your browser.');
    }
  };

  if (loading) {
    return (
      <motion.div 
        className="loading-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Lottie animationData={loading} loop={true} style={{ height: 200 }} />
        <p>Loading your ticket...</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="ticket-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="ticket-animation"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Lottie animationData={ticketAnimation} loop={true} style={{ height: 150 }} />
      </motion.div>
      
      <motion.div 
        className="ticket-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="ticket-header">
          <h1>Event Ticket</h1>
        </div>
        
        <div className="ticket-body">
          <h2>{ticketData.eventName}</h2>
          
          <div className="ticket-details">
            <div className="ticket-detail">
              <span className="detail-label">Attendee:</span>
              <span className="detail-value">{ticketData.name}</span>
            </div>
            <div className="ticket-detail">
              <span className="detail-label">Date:</span>
              <span className="detail-value">{ticketData.eventDate}</span>
            </div>
            <div className="ticket-detail">
              <span className="detail-label">Location:</span>
              <span className="detail-value">{ticketData.eventLocation}</span>
            </div>
            <div className="ticket-detail">
              <span className="detail-label">Ticket ID:</span>
              <span className="detail-value">{ticketData.id}</span>
            </div>
            <div className="ticket-detail">
              <span className="detail-label">Ticket Type:</span>
              <span className="detail-value">{ticketData.ticketType}</span>
            </div>
          </div>
          
          <motion.div 
            className="ticket-qr"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <QRCode 
              value={JSON.stringify({
                id: ticketData.id,
                name: ticketData.name,
                email: ticketData.email,
                event: ticketData.eventName
              })} 
              size={180}
            />
            <p>Scan this QR code at the event entrance</p>
          </motion.div>
          
          <motion.div 
            className="ticket-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <motion.button 
              className="btn btn-primary" 
              onClick={handleDownload}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Ticket
            </motion.button>
            <motion.button 
              className="btn btn-secondary" 
              onClick={handleShare}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Share Ticket
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div 
        className="ticket-info"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        <h3>Important Information</h3>
        <ul>
          <li>Please arrive 15 minutes before the event starts</li>
          <li>Have your ticket QR code ready for scanning</li>
          <li>Follow all venue guidelines and safety protocols</li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default Ticket;
